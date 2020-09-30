import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { updateProfile } from "../store/profile";
import "../css/settings.css";
import CustSpinner from "./layout/CustSpinner";
import darkV10 from "../img/dark-v10.png";
import lightV10 from "../img/light-v10.png";
import outdoorsV11 from "../img/outdoors-v11.png";
import streetsV11 from "../img/streets-v11.png";
import satelliteV9 from "../img/satellite-v9.png";

const Settings = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("");
  const [mapStyle, setMapStyle] = useState("");
  const [fillColor, setFillColor] = useState("");
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    if (!loading) {
      setTheme(profile.theme);
      setMapStyle(profile.mapStyle);
      setFillColor(profile.fillColor);
      setVisited(profile.visited);
    }
  }, [profile]);

  const onSubmit = e => {
    e.preventDefault();

    const profile = {
      theme,
      mapStyle,
      fillColor,
      visited,
    };

    dispatch(updateProfile(profile));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 4000);
  };

  if (!loading && JSON.stringify(profile) === "{}")
    return <Redirect to="/create" />;

  return (
    <div className="settings-div">
      {loading ? (
        <div className="spinner-div">
          <CustSpinner />
        </div>
      ) : (
        <div className="settings-div-inner grid grid-cols-5">
          {saved && (
            <div className="saved-changes">
              <p className="m-0">Changes Saved!</p>
            </div>
          )}

          <div className="settings-card">
            <div className="flex justify-between items-center">
              <Link className="gen-btn danger-btn" to="/map">
                Back to Map
              </Link>
              <button
                className="gen-btn primary-btn"
                type="submit"
                form="settings-form"
              >
                Save{" "}
              </button>
            </div>
          </div>

          <div className="settings-card">
            <h2>Account Info</h2>
            <h4>{user.username}</h4>
            <h5>{user.email}</h5>
            <p>
              Registered on{" "}
              <Moment format="MMM Do, YYYY hh:mm:ss A">{user.date}</Moment>
            </p>
          </div>

          <div className="settings-card">
            <h2>User Settings</h2>
            <div className="settings-theme">
              <h4 className="w-full">Site Theme</h4>
              <div
                className="theme-option mr-2"
                onClick={() => setTheme("light")}
                style={{
                  backgroundColor: theme === "light" && "#2b6cb0",
                  color: theme === "light" && "#e2e8f0",
                }}
              >
                Light
              </div>
              <div
                className="theme-option"
                onClick={() => setTheme("dark")}
                style={{
                  backgroundColor: theme === "dark" && "#2b6cb0",
                  color: theme === "dark" && "#e2e8f0",
                }}
              >
                Dark
              </div>
            </div>
            <h4 className="mb-3">Map Style</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="md:col-span-1 sm:col-span-2">
                <label>Dark V10</label>
                <img
                  className="thumbnail"
                  src={darkV10}
                  alt="mapbox dark-v10 theme"
                  onClick={() => setMapStyle("dark-v10")}
                  style={{
                    filter: mapStyle === "dark-v10" && "blur(2px)",
                    transform: mapStyle === "dark-v10" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Light V10</label>
                <img
                  className="thumbnail"
                  src={lightV10}
                  alt="mapbox light-v10 theme"
                  onClick={() => setMapStyle("light-v10")}
                  style={{
                    filter: mapStyle === "light-v10" && "blur(2px)",
                    transform: mapStyle === "light-v10" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Outdoors V11</label>
                <img
                  className="thumbnail"
                  src={outdoorsV11}
                  alt="mapbox outdoors-v11 theme"
                  onClick={() => setMapStyle("outdoors-v11")}
                  style={{
                    filter: mapStyle === "outdoors-v11" && "blur(2px)",
                    transform: mapStyle === "outdoors-v11" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Streets V11</label>
                <img
                  className="thumbnail"
                  src={streetsV11}
                  alt="mapbox streets-v11 theme"
                  onClick={() => setMapStyle("streets-v11")}
                  style={{
                    filter: mapStyle === "streets-v11" && "blur(2px)",
                    transform: mapStyle === "streets-v11" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label>Satellite V9</label>
                <img
                  className="thumbnail sat-img-settings"
                  src={satelliteV9}
                  alt="mapbox satellite-v9 theme"
                  onClick={() => setMapStyle("satellite-v9")}
                  style={{
                    filter: mapStyle === "satellite-v9" && "blur(2px)",
                    transform: mapStyle === "satellite-v9" && "scale(1.2)",
                  }}
                />
              </div>
            </div>
            <form
              id="settings-form"
              className="col-span-5"
              onSubmit={e => onSubmit(e)}
            >
              <div className="mb-5">
                <label className="mt-3">
                  <h4>Region Highlight Color</h4>
                </label>
                <input
                  onChange={e => setFillColor(e.target.value)}
                  type="text"
                  name="fillColor"
                  className="cust-input"
                  placeholder="Color"
                  value={fillColor}
                />
                <p className="mt-2">
                  Click{" "}
                  <a
                    className="std-link"
                    href="https://htmlcolorcodes.com/color-picker/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>{" "}
                  for hex color codes
                </p>
              </div>

              <div></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
