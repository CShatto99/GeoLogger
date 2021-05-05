import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMapGL, { Layer, Source, Marker, Popup } from "react-map-gl";
import ReactTooltip from "react-tooltip";
import geoJSON from "../json/geoJSON.json";
import "../css/mapbox.css";
import CustSpinner from "./layout/CustSpinner";
import Checklist from "./Checklist";
import MarkerPopup from "./MarkerPopup";
import useWindowDimensions from "../hooks/windowDimensions";
import { updateProfile } from "../store/profile";
import { setAlert } from "../store/alert";

const Mapbox = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector(state => state.profile);
  const { isAuth } = useSelector(state => state.auth);
  const { height } = useWindowDimensions();

  const [viewport, setViewport] = useState({
    width: "100%",
    height: height,
    latitude: 40,
    longitude: -92,
    zoom: 3,
  });
  const [sources, setSources] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [markerJustMoved, setMarkerJustMoved] = useState(false);
  const [markersEdited, setMarkersEdited] = useState(false);
  const [markerMode, setMarkerMode] = useState(false);
  const [modeJustChanged, setModeJustChanged] = useState(false);

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
      setMarkers(profile.markers);
    }
  }, [profile]);

  useEffect(() => {
    if (markersEdited) {
      dispatch(updateProfile({ ...profile, markers }));
      dispatch(setAlert("Saved!", 200));
      setMarkersEdited(false);
    }
  }, [markers, markersEdited]);

  const addMarker = ([longitude, latitude]) => {
    const newMarker = {
      longitude,
      latitude,
      open: false,
      title: "",
      date: "",
      notes: "",
      image: "",
    };
    setMarkers(markers => [...markers, newMarker]);
    setMarkersEdited(true);
    setMarkerMode(false);
  };

  const handleMarkerDrag = ([longitude, latitude], index) => {
    setMarkers(prevMarkers =>
      prevMarkers.map((m, i) =>
        index !== i ? m : { ...m, ...{ longitude, latitude } }
      )
    );
    setMarkerJustMoved(true);
    setTimeout(() => setMarkerJustMoved(false), 100);
    setMarkersEdited(true);
  };

  const handleMarkerClick = index => {
    if (!markerJustMoved) {
      setMarkers(prevMarkers =>
        prevMarkers.map((m, i) => (index === i ? { ...m, open: !m.open } : m))
      );

      setMarkersEdited(true);
    }
  };

  if (isAuth && JSON.stringify(profile) === "{}") {
    return <Redirect to="/create" />;
  }

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
            onClick={({ lngLat }) =>
              markerMode && !modeJustChanged && addMarker(lngLat)
            }
          >
            {sources}
            <div className="add-states">
              <Checklist />
              {markerMode && (
                <ReactTooltip id="marker-btn" aria-haspopup="true">
                  Click on the map to add a marker!
                </ReactTooltip>
              )}
              <button
                data-tip
                data-for="marker-btn"
                className="gen-btn primary-btn"
                onClick={() => {
                  setMarkerMode(!markerMode);
                  setModeJustChanged(true);
                  setTimeout(() => setModeJustChanged(false), 400);
                }}
              >
                {markerMode ? "Exit Marker Mode" : "Add A Marker"}
              </button>
            </div>

            {markers.map((m, index) => (
              <React.Fragment key={index}>
                <div onClick={() => handleMarkerClick(index)}>
                  {m.title && (
                    <ReactTooltip id={`marker-${index}`} aria-haspopup="true">
                      {m.title}
                    </ReactTooltip>
                  )}

                  <Marker
                    {...m}
                    offsetLeft={-23}
                    offsetTop={-23}
                    draggable
                    onClick={index => handleMarkerClick(m, index)}
                    onDragEnd={({ lngLat }) => handleMarkerDrag(lngLat, index)}
                  >
                    <i
                      className="gen-btn fa fa-globe"
                      aria-hidden="true"
                      data-tip
                      data-for={`marker-${index}`}
                    >
                      <div className="navbrand-icon" id="marker" />
                    </i>
                  </Marker>
                </div>
                {markers[index].open && (
                  <Popup
                    {...m}
                    tipSize={10}
                    anchor="bottom"
                    closeButton={false}
                    closeOnClick={false}
                    offsetTop={-10}
                    onClose={() => handleMarkerClick(index)}
                  >
                    <MarkerPopup
                      handleMarkerClick={handleMarkerClick}
                      index={index}
                      marker={m}
                      markers={markers}
                      setMarkers={setMarkers}
                      setMarkersEdited={() => {
                        setMarkersEdited(true);
                      }}
                    />
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
