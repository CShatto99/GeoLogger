import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalBody, ListGroup, Button } from "reactstrap";
import "../css/home.css";
import usa from "../json/US.json";
import darkV10 from "../img/dark-v10.png";
import lightV10 from "../img/light-v10.png";
import outdoorsV11 from "../img/outdoors-v11.png";
import streetsV11 from "../img/streets-v11.png";
import satelliteV9 from "../img/satellite-v9.png";
import vacaEx from "../img/vaca-ex.png";

let modalDemo = [];

for (let i = 0; i < 10; i++) {
  modalDemo.push(
    <Button
      key={usa[i].name}
      id={usa[i].name}
      className="text-left"
      color="light"
      block
    >
      {usa[i].name}
      {Math.random() > 0.6 && (
        <span className="float-right text-success">VISITED</span>
      )}
    </Button>
  );
}

const Home = () => {
  const [landingDiv, setLandingDiv] = useState(false);

  useEffect(() => {
    setLandingDiv(!landingDiv);
  }, []);

  return (
    <>
      <div className="landing-div">
        <div
          className={
            landingDiv
              ? "landing-div-inner div-enter"
              : "landing-div-inner div-exit"
          }
        >
          <h1>Welcome To GeoLogger</h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi
            tristique senectus et netus et malesuada fames.
          </p>
          <Link className="gen-btn primary-btn start-btn" to="/register">
            Start Logging
          </Link>
        </div>
      </div>

      <div className="map-div">
        <div className="map-div-inner grid md:grid-cols-2 grid-cols-1">
          <h1 className="col-span-1 md:col-span-2">Choose a Map Style</h1>
          <div>
            <img src={darkV10} alt="mapbox dark-v10 theme" />
            <h3>Dark V10</h3>
          </div>
          <div>
            <img src={lightV10} alt="mapbox light-v10 theme" />
            <h3>Light V10</h3>
          </div>
          <div>
            <img src={outdoorsV11} alt="mapbox outdoors-v11 theme" />
            <h3>Outdoors V11</h3>
          </div>
          <div>
            <img src={streetsV11} alt="mapbox streets-v11 theme" />
            <h3>Streets V11</h3>
          </div>
          <div className="md:col-span-2 sm:col-span-1">
            <img
              className="sat-img"
              src={satelliteV9}
              alt="mapbox satellite-v9 theme"
            />
            <h3>Satellite V9</h3>
          </div>
        </div>
      </div>

      <div className="vaca-history grid-cols-1 md:grid-cols-2">
        <h1 className="col-span-1 md:col-span-2">Log Your Vacation History</h1>
        <div className="my-auto">
          <img src={vacaEx} alt="mapbox outdoors-v11 theme" />
        </div>
        <div className="modal-prop">
          <ModalBody>
            <ListGroup>{modalDemo}</ListGroup>
          </ModalBody>
        </div>
      </div>
    </>
  );
};

export default Home;
