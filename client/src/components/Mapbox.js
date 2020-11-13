import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMapGL, { Layer, Source, Marker } from "react-map-gl";
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

  if (isAuth && JSON.stringify(profile) === "{}")
    return <Redirect to="/create" />;

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
            onClick={({ lngLat: [longitude, latitude] }) =>
              setMarkers(markers => [...markers, { longitude, latitude }])
            }
          >
            {sources}
            <Checklist />
            {markers.map((m, index) => (
              <Marker
                key={index}
                {...m}
                offsetLeft={-23}
                offsetTop={-23}
                draggable
                onDragEnd={({ lngLat: [longitude, latitude] }) =>
                  setMarkers(prevMarkers =>
                    prevMarkers.map((m, i) =>
                      index !== i ? m : { longitude, latitude }
                    )
                  )
                }
              >
                <i className="gen-btn fa fa-globe" aria-hidden="true">
                  <div className="navbrand-icon"></div>
                </i>
              </Marker>
            ))}
          </ReactMapGL>
        </div>
      )}
    </>
  );
};

export default Mapbox;
