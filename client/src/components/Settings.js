import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { updateProfile } from "../store/profile";
import { updateUser } from "../store/auth";
import { setAlert } from "../store/alert";
import "../css/settings.css";
import CustSpinner from "./layout/CustSpinner";
import darkV10 from "../img/dark-v10.png";
import lightV10 from "../img/light-v10.png";
import outdoorsV11 from "../img/outdoors-v11.png";
import streetsV11 from "../img/streets-v11.png";
import satelliteV9 from "../img/satellite-v9.png";
import colors from "../json/colors.json";

const Settings = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const { user, isAuth } = useSelector(state => state.auth);
  const { msg, status } = useSelector(state => state.alert);
  const [theme, setTheme] = useState("");
  const [mapStyle, setMapStyle] = useState("");
  const [fillColor, setFillColor] = useState("");
  const [visited, setVisited] = useState([]);
  const [editAccount, setEditAccount] = useState([0, 0]);
  const [accountEdited, setAccountEdited] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!loading) {
      setTheme(profile.theme);
      setMapStyle(profile.mapStyle);
      setFillColor(profile.fillColor);
      setVisited(profile.visited);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [profile, user]);

  const onSubmit = e => {
    e.preventDefault();

    const updatedProfile = {
      theme,
      mapStyle,
      fillColor,
      visited,
    };

    dispatch(updateProfile({ ...profile, ...updatedProfile }));
    accountEdited && dispatch(updateUser({ username, email }));
    dispatch(setAlert("Changes Saved!", 200));
  };

  if (isAuth && JSON.stringify(profile) === "{}")
    return <Redirect to="/create" />;

  return (
    <div className="settings-div">
      {loading ? (
        <div className="spinner-div">
          <CustSpinner />
        </div>
      ) : (
        <div className="settings-div-inner grid grid-cols-5">
          {msg !== "Please enter both fields" && status === 400 && (
            <div className="err-div col-span-5">
              <p className="m-0">{msg}</p>
            </div>
          )}
          {msg && status === 200 && (
            <div className="saved-changes">
              <p className="m-0">{msg}</p>
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
            <div className="account-field">
              {editAccount[0] < 1 ? (
                <>
                  <i
                    onClick={() => {
                      editAccount[0] < 1
                        ? setEditAccount([1, 0])
                        : setEditAccount([0, 0]);
                    }}
                    className="fa fa-pencil-square-o fa-settings"
                    aria-hidden="true"
                  ></i>
                  <h4>{username} </h4>
                </>
              ) : (
                <>
                  <i
                    onClick={() => {
                      editAccount[0] < 1
                        ? setEditAccount([1, 0])
                        : setEditAccount([0, 0]);
                    }}
                    className="fa fa-check-square fa-settings fa-ch-sq-cust"
                    aria-hidden="true"
                  ></i>
                  <input
                    type="text"
                    name="username"
                    className="cust-input"
                    placeholder="Username"
                    onChange={e => {
                      setUsername(e.target.value);
                      setAccountEdited(true);
                    }}
                    value={username}
                  />
                </>
              )}
            </div>
            <div className="account-field">
              {editAccount[1] < 1 ? (
                <>
                  <i
                    onClick={() => {
                      editAccount[1] < 1
                        ? setEditAccount([0, 1])
                        : setEditAccount([0, 0]);
                    }}
                    className="fa fa-pencil-square-o fa-settings"
                    aria-hidden="true"
                  ></i>
                  <h5>{email} </h5>
                </>
              ) : (
                <>
                  <i
                    onClick={() => {
                      editAccount[1] < 1
                        ? setEditAccount([0, 1])
                        : setEditAccount([0, 0]);
                    }}
                    className="fa fa-check-square fa-settings fa-ch-sq-cust"
                    aria-hidden="true"
                  ></i>
                  <input
                    type="text"
                    name="email"
                    className="cust-input"
                    placeholder="Email"
                    onChange={e => {
                      setEmail(e.target.value);
                      setAccountEdited(true);
                    }}
                    value={email}
                  />
                </>
              )}
            </div>
            <p>
              Registered on{" "}
              <Moment format="MMM Do, YYYY hh:mm:ss A">{user.date}</Moment>
            </p>
          </div>
          <div className="settings-card">
            <h2>User Settings</h2>
            <h4 className="mb-3">Map Style</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="md:col-span-1 sm:col-span-2">
                <label>
                  Dark V10{" "}
                  {mapStyle === "dark-v10" && (
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  )}
                </label>
                <img
                  className={
                    mapStyle === "dark-v10" ? "cust-img-active" : "cust-img"
                  }
                  src={darkV10}
                  alt="mapbox dark-v10 theme"
                  onClick={() => setMapStyle("dark-v10")}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>
                  Light V10{" "}
                  {mapStyle === "light-v10" && (
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  )}
                </label>
                <img
                  className={
                    mapStyle === "light-v10" ? "cust-img-active" : "cust-img"
                  }
                  src={lightV10}
                  alt="mapbox light-v10 theme"
                  onClick={() => setMapStyle("light-v10")}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>
                  Outdoors V11{" "}
                  {mapStyle === "outdoors-v11" && (
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  )}
                </label>
                <img
                  className={
                    mapStyle === "outdoors-v11" ? "cust-img-active" : "cust-img"
                  }
                  src={outdoorsV11}
                  alt="mapbox outdoors-v11 theme"
                  onClick={() => setMapStyle("outdoors-v11")}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>
                  Streets V11{" "}
                  {mapStyle === "streets-v11" && (
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  )}
                </label>
                <img
                  className={
                    mapStyle === "streets-v11" ? "cust-img-active" : "cust-img"
                  }
                  src={streetsV11}
                  alt="mapbox streets-v11 theme"
                  onClick={() => setMapStyle("streets-v11")}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label>
                  Satellite V9{" "}
                  {mapStyle === "satellite-v9" && (
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  )}
                </label>
                <img
                  className={
                    mapStyle === "satellite-v9"
                      ? "cust-img-active sat-img-settings"
                      : "cust-img  sat-img-settings"
                  }
                  src={satelliteV9}
                  alt="mapbox satellite-v9 theme"
                  onClick={() => setMapStyle("satellite-v9")}
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
                <div className="color-div">
                  {colors.map(({ name, hex }, index) => {
                    console.log("Profile fillColor: ", fillColor);
                    console.log("Color Hex: ", hex);
                    return (
                      <div
                        key={hex}
                        className={fillColor === hex ? "cb cb-active" : "cb"}
                        onClick={() => setFillColor(hex)}
                        style={{
                          backgroundColor: hex,
                        }}
                      >
                        <div className="color-block-label">
                          {name}{" "}
                          {fillColor === hex && (
                            <i
                              className="fa fa-check-square"
                              aria-hidden="true"
                            ></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <p className="w-full mt-2">
                    Not seeing your favorite color? Click{" "}
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
                <input
                  onChange={e => setFillColor(e.target.value)}
                  type="text"
                  name="fillColor"
                  className="cust-input"
                  placeholder="Color"
                  value={fillColor}
                />
                <p className="mt-2"></p>
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
