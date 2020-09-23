import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import "../../css/footer.css";

const Footer = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  const onChange = () => {};

  const onSubmit = () => {};

  const guestLinks = (
    <>
      <div>
        <Link
          to="/login"
          className="nav-link footer-link-hover text-gray-400 hover:text-gray-600"
        >
          Login
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link
          to="/register"
          className="nav-link footer-link-hover text-gray-400 hover:text-gray-600"
        >
          Register
        </Link>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  const authLinks = (
    <>
      <div>
        <Link
          to="/map"
          className="nav-link footer-link-hover text-gray-400 hover:text-gray-600"
        >
          Map
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link
          to="/settings"
          className="nav-link footer-link-hover text-gray-400 hover:text-gray-600"
        >
          Settings
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <a
          href="/"
          onClick={() => dispatch(logout())}
          className="nav-link footer-link-hover cursor-pointer text-gray-400 hover:text-gray-600"
        >
          Logout
        </a>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  return (
    <footer className="bg-transparent">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-1 gap-10 text-center text-gray-200 p-5">
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
              className="nav-link footer-link-hover text-gray-400 hover:text-gray-600"
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
                onChange={e => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label>Message</label>
              <input
                type="textarea"
                name="message"
                className="cust-input"
                placeholder="Message"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="flex justify-center items-center">
              <button className="gen-btn bg-blue-700 text-white font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800">
                Send
              </button>
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
            href="https://github.com/"
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
