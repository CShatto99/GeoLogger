import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/profile";
import { clearAlert } from "../../store/alert";
import darkV10 from "../../img/dark-v10.png";
import lightV10 from "../../img/light-v10.png";
import outdoorsV11 from "../../img/outdoors-v11.png";
import streetsV11 from "../../img/streets-v11.png";
import satelliteV9 from "../../img/satellite-v9.png";
import colors from "../../json/colors.json";
import "../../css/authForm.css";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { msg } = useSelector(state => state.alert);
  const [mapStyle, setMapStyle] = useState("");
  const [fillColor, setFillColor] = useState("");
  const [colorIndex, setColorIndex] = useState(null);

  const onSubmit = () => {
    const profile = {
      theme: "dark",
      mapStyle,
      fillColor,
      visited: [],
    };

    dispatch(updateProfile(profile));
  };

  if (msg)
    setTimeout(() => {
      dispatch(clearAlert());
    }, 4000);

  if (JSON.stringify(profile) !== "{}") return <Redirect to="/map" />;

  console.log(fillColor);

  return (
    <div className="map-div min-h-screen max-w-6xl mx-auto text-center grid grid-cols-1 mb-5 pt-24 pr-4 pb-4 pl-4">
      <h1 className="mb-5">Lets Start by Setting Up a Profile</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 text-center mb-5">
        <h1 className="font-medium md:col-span-2">Choose a Map Style</h1>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={darkV10}
            alt="mapbox dark-v10 theme"
            onClick={() => setMapStyle("dark-v10")}
            style={{
              filter: mapStyle === "dark-v10" ? "blur(2px)" : undefined,
              transform: mapStyle === "dark-v10" ? "scale(1.1)" : undefined,
            }}
          />
          <h3 className="mt-2 font-light">Dark V10</h3>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={lightV10}
            alt="mapbox light-v10 theme"
            onClick={() => setMapStyle("light-v10")}
            style={{
              filter: mapStyle === "light-v10" ? "blur(2px)" : undefined,
              transform: mapStyle === "light-v10" ? "scale(1.1)" : undefined,
            }}
          />
          <h3 className="mt-2 font-light">Light V10</h3>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={outdoorsV11}
            alt="mapbox outdoors-v11 theme"
            onClick={() => setMapStyle("outdoors-v11")}
            style={{
              filter: mapStyle === "outdoors-v11" ? "blur(2px)" : undefined,
              transform: mapStyle === "outdoors-v11" ? "scale(1.1)" : undefined,
            }}
          />
          <h3 className="mt-2 font-light">Outdoors V11</h3>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={streetsV11}
            alt="mapbox streets-v11 theme"
            onClick={() => setMapStyle("streets-v11")}
            style={{
              filter: mapStyle === "streets-v11" ? "blur(2px)" : undefined,
              transform: mapStyle === "streets-v11" ? "scale(1.1)" : undefined,
            }}
          />
          <h3 className="mt-2 font-light">Streets V11</h3>
        </div>
        <div className="md:col-span-2 sm:col-span-1">
          <img
            className="sat-img rounded-lg shadow-lg mx-auto"
            src={satelliteV9}
            alt="mapbox satellite-v9 theme"
            onClick={() => setMapStyle("satellite-v9")}
            style={{
              filter: mapStyle === "satellite-v9" ? "blur(2px)" : undefined,
              transform: mapStyle === "satellite-v9" ? "scale(1.1)" : undefined,
            }}
          />
          <h3 className="mt-2 font-light">Satellite V9</h3>
        </div>
      </div>
      <div className="flex flex-wrap justify-center text-center">
        <h1 className="mb-4 w-full">Choose A Highlight Color</h1>
        {colors.map(({ name, hex }, index) => (
          <div
            key={hex}
            className="color-block"
            onClick={() => {
              setFillColor(hex);
              setColorIndex(index);
            }}
            style={{
              backgroundColor: hex,
              opacity: colorIndex === index ? "0.2" : undefined,
            }}
          >
            <div className="color-block-label bg-gray-200">{name}</div>
          </div>
        ))}
        <p className="w-full mt-2">
          Not seeing your favorite color? You can apply a custom highlight color
          in your profile settings
        </p>
      </div>
      {msg && (
        <div className="bg-red-300 rounded-lg p-2">
          <p className="m-0 text-gray-800 text-center">{msg}</p>
        </div>
      )}
      <button
        onClick={onSubmit}
        className="gen-btn bg-blue-700 text-gray-200 font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800"
      >
        Finish
      </button>
    </div>
  );
};

export default CreateProfile;
