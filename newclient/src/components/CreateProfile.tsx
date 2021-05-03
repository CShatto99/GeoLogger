import { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { updateProfile } from '../store/profile';
import darkV10 from '../img/dark-v10.png';
import lightV10 from '../img/light-v10.png';
import outdoorsV11 from '../img/outdoors-v11.png';
import streetsV11 from '../img/streets-v11.png';
import satelliteV9 from '../img/satellite-v9.png';
import colors from '../json/colors.json';
import '../css/createProfile.css';
//import GeoLoggerSpinner from './GeoLoggerSpinner';

const CreateProfile: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { msg } = useAppSelector((state) => state.alert);
  const [mapStyle, setMapStyle] = useState('');
  const [fillColor, setFillColor] = useState('');
  const [colorIndex, setColorIndex] = useState(-1);

  const onSubmit = () => {
    const profile = {
      theme: 'dark',
      mapStyle,
      fillColor,
      visited: [],
      markers: [],
    };

    dispatch(updateProfile(profile));
  };

  // if (
  //   localStorage.getItem("isAuth") === "true" &&
  //   JSON.stringify(profile) === "{}"
  // )
  //   return (
  //     <div className="spinner-div">
  //       <GeoLoggerSpinner />
  //     </div>
  //   );

  // if (isAuth && JSON.stringify(profile) !== "{}") return <Redirect to="/map" />;

  /*
localStorage.getItem("isAuth") === "true" &&
    JSON.stringify(profile) === "{}" ? (
    <div className="spinner-div">
      <GeoLoggerSpinner />
    </div>
  ) :

    
  */

  return isAuth && JSON.stringify(profile) !== '{}' ? (
    <Redirect to="/map" />
  ) : (
    <div className="create-profile-div">
      <h1 className="mb-5">Lets Start by Setting Up a Profile</h1>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
        <h1 className="font-medium md:col-span-2">Choose a Map Style</h1>
        <div>
          <img
            className={mapStyle === 'dark-v10' ? 'cust-img-active' : 'cust-img'}
            src={darkV10}
            alt="mapbox dark-v10 theme"
            onClick={() => setMapStyle('dark-v10')}
          />
          <h3 className="mt-2 font-light">
            Dark V10 {mapStyle === 'dark-v10' && <i className="fa fa-check-square" aria-hidden="true"></i>}
          </h3>
        </div>
        <div>
          <img
            className={mapStyle === 'light-v10' ? 'cust-img-active' : 'cust-img'}
            src={lightV10}
            alt="mapbox light-v10 theme"
            onClick={() => setMapStyle('light-v10')}
          />
          <h3 className="mt-2 font-light">
            Light V10 {mapStyle === 'light-v10' && <i className="fa fa-check-square" aria-hidden="true"></i>}
          </h3>
        </div>
        <div>
          <img
            className={mapStyle === 'outdoors-v11' ? 'cust-img-active' : 'cust-img'}
            src={outdoorsV11}
            alt="mapbox outdoors-v11 theme"
            onClick={() => setMapStyle('outdoors-v11')}
          />
          <h3 className="mt-2 font-light">
            Outdoors V11 {mapStyle === 'outdoors-v11' && <i className="fa fa-check-square" aria-hidden="true"></i>}
          </h3>
        </div>
        <div>
          <img
            className={mapStyle === 'streets-v11' ? 'cust-img-active' : 'cust-img'}
            src={streetsV11}
            alt="mapbox streets-v11 theme"
            onClick={() => setMapStyle('streets-v11')}
          />
          <h3 className="mt-2 font-light">
            Streets V11 {mapStyle === 'streets-v11' && <i className="fa fa-check-square" aria-hidden="true"></i>}
          </h3>
        </div>
        <div className="md:col-span-2 sm:col-span-1">
          <img
            className={mapStyle === 'satellite-v9' ? 'cust-img-active sat-img mx-auto' : 'cust-img sat-img mx-auto'}
            src={satelliteV9}
            alt="mapbox satellite-v9 theme"
            onClick={() => setMapStyle('satellite-v9')}
          />
          <h3 className="mt-2 font-light">
            Satellite V9 {mapStyle === 'satellite-v9' && <i className="fa fa-check-square" aria-hidden="true"></i>}
          </h3>
        </div>
      </div>
      <div className="color-div">
        <h1 className="mb-4 w-full">Choose A Highlight Color</h1>
        {colors.map(({ name, hex }, index) => (
          <div
            key={hex}
            className={colorIndex === index ? 'cb cb-active' : 'cb'}
            onClick={() => {
              setFillColor(hex);
              setColorIndex(index);
            }}
            style={{
              backgroundColor: hex,
            }}
          >
            <div className="color-block-label">
              {name} {colorIndex === index && <i className="fa fa-check-square" aria-hidden="true"></i>}
            </div>
          </div>
        ))}
        <p className="w-full mt-2">
          Not seeing your favorite color? You can apply a custom highlight color in your profile settings
        </p>
      </div>
      {msg && (
        <div className="err-div">
          <p className="m-0">{msg}</p>
        </div>
      )}
      <button onClick={onSubmit} className="gen-btn form-btn w-full">
        Finish
      </button>
    </div>
  );
};

export default CreateProfile;
