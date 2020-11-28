import React, { useState } from "react";
import { useDispatch } from "react-redux";
import handleFile from "../utils/handleFile";
import { setAlert } from "../store/alert";
import "../css/markerPopup.css";

const MarkerPopup = ({ handleMarkerClick, index, markers, setMarkers }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);

  const handleFileUpload = e => {
    const validFile = handleFile(e);

    validFile
      ? setImage(validFile)
      : dispatch(setAlert("Image must be of type .png or .jpg.", 400));
  };

  const onSubmit = e => {
    e.preventDefault();

    const marker = {
      title,
      date,
      notes,
      image,
    };

    setMarkers(markers.map((m, i) => (i === index ? { ...m, ...marker } : m)));
  };

  return (
    <>
      <div className="popup-inner">
        <div className="popup-btn-grp">
          <button type="button">
            <i
              className="fa fa-trash fa-popup fa-popup-trash"
              aria-hidden="true"
            ></i>
          </button>
          <div>
            <button type="button" onClick={() => setEditing(true)}>
              <i
                className="fa fa-pencil fa-popup fa-popup-pencil"
                aria-hidden="true"
              ></i>
            </button>
            <button
              type="button"
              onClick={() => {
                handleMarkerClick(index);
                setEditing(false);
              }}
            >
              <i
                className="fa fa-times fa-popup fa-popup-times"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label>Title</label>
          {editing ? (
            <input
              type="text"
              name="title"
              className="cust-input"
              onChange={e => setTitle(e.target.value)}
            />
          ) : (
            <p>Title will appear here</p>
          )}
        </div>
        <div className="mb-2">
          <label>Date Travelled</label>
          {editing ? (
            <input
              type="password"
              name="password"
              className="cust-input"
              onChange={e => setDate(e.target.value)}
            />
          ) : (
            <p>Date will appear here</p>
          )}
        </div>
        <div className="mb-3">
          <label>Notes</label>
          {editing ? (
            <textarea
              name="notes"
              className="cust-input"
              onChange={e => setNotes(e.target.value)}
            />
          ) : (
            <p>Notes will appear here</p>
          )}
        </div>
        <div>
          {editing ? (
            <label className="gen-btn primary-btn file-btn">
              <input
                type="file"
                name="image"
                className="file-upload"
                onChange={e => handleFileUpload(e)}
              />
              Upload Image
            </label>
          ) : (
            <img src={image} className="" />
          )}
        </div>
        <button
          className="gen-btn popup-submit"
          onClick={() => setEditing(false)}
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default MarkerPopup;
