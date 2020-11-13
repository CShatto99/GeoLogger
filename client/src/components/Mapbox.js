import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMapGL, { Layer, Source, Marker, Popup } from "react-map-gl";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import geoJSON from "../json/geoJSON.json";
import "../css/mapbox.css";
import CustSpinner from "./layout/CustSpinner";
import Checklist from "./Checklist";
import useWindowDimensions from "../hooks/windowDimensions";

const Mapbox = () => {
  const { profile, loading } = useSelector(state => state.profile);
  const { isAuth } = useSelector(state => state.auth);
  const { width, height } = useWindowDimensions();
  const [sources, setSources] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [markersModal, setMarkersModal] = useState([]);
  const [popupJustClosed, setPopupJustClosed] = useState(false);
  const [markerJustMoved, setMarkerJustMoved] = useState(false);

  let geoJSONRegions = [];

  useEffect(() => {
    if (!loading && JSON.stringify(profile) !== "{}") {
      profile.visited.map(region => {
        const { source, coordinates } = geoJSON.regions.find(
          ({ source }) => source === region
        );

        geoJSONRegions.push(
          <Source
            key={source}
            id={source}
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: { type: "Polygon", coordinates: coordinates },
                },
              ],
            }}
          >
            <Layer
              id={source}
              type="fill"
              paint={{
                "fill-color": profile.fillColor,
                "fill-opacity": 0.5,
              }}
            />
          </Source>
        );
      });
      setSources(geoJSONRegions);
    }
  }, [profile]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: height,
    latitude: 40,
    longitude: -92,
    zoom: 3,
  });

  const addMarker = ([longitude, latitude]) => {
    setMarkers(markers => [...markers, { longitude, latitude }]);
    setMarkersModal(markersModal => markersModal.concat(false));
  };

  const handleMarkerDrag = ([longitude, latitude], index) => {
    setMarkers(prevMarkers =>
      prevMarkers.map((m, i) => (index !== i ? m : { longitude, latitude }))
    );
    setMarkerJustMoved(true);
    setTimeout(() => setMarkerJustMoved(false), 100);
  };

  const handleMarkerClick = index => {
    if (!markerJustMoved) {
      setMarkersModal(prevMarkersModal =>
        prevMarkersModal.map((markerModal, i) =>
          index === i ? !markerModal : markerModal
        )
      );
      setPopupJustClosed(true);
      setTimeout(() => setPopupJustClosed(false), 400);
    }
  };

  if (isAuth && JSON.stringify(profile) === "{}")
    return <Redirect to="/create" />;

  console.log(markerJustMoved);

  return (
    <>
      {loading ? (
        <div className="spinner-div">
          <CustSpinner />
        </div>
      ) : (
        <div className="map-container">
          <ReactMapGL
            {...viewport}
            mapStyle={`mapbox://styles/mapbox/${profile.mapStyle}`}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            className="w-full"
            onClick={({ lngLat }) => !popupJustClosed && addMarker(lngLat)}
          >
            {sources}
            <Checklist />

            {markers.map((m, index) => (
              <React.Fragment key={index}>
                <div onClick={() => handleMarkerClick(index)}>
                  <Marker
                    {...m}
                    offsetLeft={-23}
                    offsetTop={-23}
                    draggable
                    onClick={index => handleMarkerClick(m, index)}
                    onDragEnd={({ lngLat }) => handleMarkerDrag(lngLat, index)}
                  >
                    <i className="gen-btn fa fa-globe" aria-hidden="true">
                      <div className="navbrand-icon" />
                    </i>
                  </Marker>
                </div>
                {markersModal[index] && (
                  <Popup
                    {...m}
                    tipSize={10}
                    anchor="bottom"
                    closeButton={false}
                    closeOnClick={false}
                    offsetTop={-10}
                    onClose={() => handleMarkerClick(index)}
                  >
                    <div className="popup-inner">
                      <div className="popup-btn-grp">
                        <button type="button">
                          <i
                            className="fa fa-trash fa-popup fa-popup-trash"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <div>
                          <button type="button">
                            <i
                              className="fa fa-pencil fa-popup fa-popup-pencil"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkerClick(index)}
                          >
                            <i
                              className="fa fa-times fa-popup fa-popup-times"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div>Texttestestestestestsetestes</div>
                    </div>
                  </Popup>
                )}
              </React.Fragment>
            ))}
          </ReactMapGL>
        </div>
      )}
    </>
  );
};

export default Mapbox;
