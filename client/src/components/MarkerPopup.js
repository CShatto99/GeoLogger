import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleFile from "../utils/handleFile";
import { setAlert } from "../store/alert";
import "../css/markerPopup.css";
import profile, { updateProfile } from "../store/profile";
import { set } from "mongoose";

const MarkerPopup = ({
  handleMarkerClick,
  index,
  marker,
  markers,
  setMarkers,
  setPopupEdited,
}) => {
  const dispatch = useDispatch();

  const { loading, profile } = useSelector(state => state.profile);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTitle(marker.title);
      setDate(marker.date);
      setNotes(marker.notes);
      setImage(marker.image);
    }
  }, [loading]);

  useEffect(() => {
    console.log(markers);
    setChangesSaved(false);
  }, [title, date, notes, image]);

  const handleFileUpload = e => {
    const validFile = handleFile(e);

    console.log("FILE:" + validFile);

    setImage(e.target.files[0]);

    // validFile
    //   ? setImage(validFile.result)
    //   : dispatch(setAlert("Image must be of type .png or .jpg.", 400));
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log("FAGGOT");

    const newMarker = {
      title,
      date,
      notes,
      image,
    };

    setMarkers(prevMarkers =>
      prevMarkers.map((m, i) =>
        i === index ? { ...m, ...newMarker, open: false } : m
      )
    );
  };

  console.log(changesSaved);

  return (
    <>
      <div className="popup-inner popup-section">
        <div className="popup-btn-grp">
          <button type="button">
            <i
              className="fa fa-trash fa-popup fa-popup-trash"
              aria-hidden="true"
            ></i>
          </button>
          <div>
            <button type="button" onClick={() => setEditing(!editing)}>
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
      {editing ? (
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="mb-0">Title</label>
            <input
              type="text"
              name="title"
              className="cust-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mb-0 text-center">Date Travelled</label>
            <input
              type="date"
              name="date"
              className="cust-input"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mb-0">Notes</label>
            <textarea
              name="notes"
              className="cust-input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
          <div className="img-section">
            <label className="gen-btn primary-btn file-btn mb-0">
              <input
                type="file"
                name="image"
                className="file-upload"
                onChange={handleFileUpload}
                accept=".jpg, .jpeg, .png"
              />
              {image ? "Change Image" : "Upload Image"}
            </label>
            {image && (
              <div className="img-wrapper">
                <img src={URL.createObjectURL(image)} />
              </div>
            )}
          </div>
          <button
            className="gen-btn popup-submit"
            // onClick={() => {
            //   setEditing(false);
            // }}
          >
            Save Changes
          </button>
        </form>
      ) : (
        <>
          <div className="popup-section">
            <label className="mb-0">Title</label>
            <p>{title}</p>
          </div>
          <div className="popup-section">
            <label className="mb-0 text-center">Date Travelled</label>
            <p>{date}</p>
          </div>
          <div className="popup-section">
            <label className="mb-0">Notes</label>
            <p>{notes}</p>
          </div>
          <div className="img-section">
            {image && (
              <div className="img-wrapper">
                <img src={URL.createObjectURL(image)} className="" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MarkerPopup;
