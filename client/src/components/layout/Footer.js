import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../store/auth";
import { setAlert, clearAlert } from "../../store/alert";
import "../../css/footer.css";

const Footer = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { msg, status } = useSelector(state => state.alert);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/contact",
        { email, message },
        config
      );
      dispatch(setAlert(data.msg, 200));

      setEmail("");
      setMessage("");
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, err.response.status));
    }
  };

  const guestLinks = (
    <>
      <div>
        <Link to="/login" className="footer-link footer-link-hover">
          Login
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link to="/register" className="footer-link footer-link-hover">
          Register
        </Link>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  const authLinks = (
    <>
      <div>
        <Link to="/map" className="footer-link footer-link-hover">
          Map
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link to="/settings" className="footer-link footer-link-hover">
          Settings
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <a
          href="/"
          onClick={() => dispatch(logout())}
          className="footer-link footer-link-hover"
        >
          Logout
        </a>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  return (
    <footer className="footer-div">
      <div className="footer-div-inner grid md:grid-cols-3 sm:grid-cols-1 p-4 sm:p-5">
        <div>
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi
            tristique senectus et netus et malesuada fames.
          </p>
        </div>
        <div>
          <h2>Site Links</h2>
          <div>
            <Link
              to="/"
              className="footer-link footer-link-hover hover:text-gray-600"
            >
              Home
            </Link>
            <div className="footer-link-highlight" />
          </div>
          {isAuth ? authLinks : guestLinks}
        </div>
        <div className="text-center">
          <h2>Contact</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="cust-input"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label>Message</label>
              <input
                type="textarea"
                name="message"
                className="cust-input"
                placeholder="Message"
                onChange={e => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="contact-submit">
              <button className="gen-btn primary-btn">Send</button>{" "}
              {msg === "Please enter both fields" && status === 400 && (
                <div className="err-div py-1 ml-1">{msg}</div>
              )}
              {msg === "Email sent" && status === 200 && (
                <div className="saved-changes py-1 ml-1">{msg}</div>
              )}
            </div>
          </form>
        </div>
        <div>
          <small>&copy; Copyright {new Date().getFullYear()}, GeoLogger</small>
        </div>
        <div>
          <small>
            Made with{" "}
            <a
              className="hover:no-underline std-link text-sm"
              href="https://www.mapbox.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              MapBox
            </a>
          </small>
        </div>
        <div>
          <a
            className="footer-icon text-gray-200"
            href="https://github.com/CShatto99/GeoLogger"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa fa-github fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
