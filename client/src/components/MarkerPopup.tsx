import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setAlert } from '../store/alert';
import { MarkerType } from '../store/types';
import getBase64 from '../utils/handleFile';
//import "../css/markerPopup.css";

type MarkerPopupProps = {
  index: number;
  marker: MarkerType;
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
  setMarkersEdited: () => void;
};

const MarkerPopup: FC<MarkerPopupProps> = ({ index, marker, setMarkers, setMarkersEdited }: MarkerPopupProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.profile);
  // const { status } = useAppSelector((state) => state.alert);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTitle(marker.title);
      setDate(marker.date);
      setNotes(marker.notes);
      setImage(marker.image);
    }
  }, [loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64 = await getBase64(e);
    typeof base64 === 'string' ? dispatch(setAlert(base64, 'ERR_change_password', 400)) : setImage(base64.result);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newMarker = {
      title,
      date,
      notes,
      image,
    };

    setMarkers((prevMarkers) => prevMarkers.map((m, i) => (i === index ? { ...m, ...newMarker } : m)));

    setMarkersEdited();
  };

  return (
    <>
      <div className="popup-inner popup-section">
        <div className="popup-btn-grp">
          <button type="button">
            <i className="fa fa-trash fa-popup fa-popup-trash" aria-hidden="true"></i>
          </button>
          <div>
            <button type="button" onClick={() => setEditing(!editing)}>
              <i className="fa fa-pencil fa-popup fa-popup-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              onClick={() => {
                // setMarkers((prevMarkers) => prevMarkers.map((m, i) => (i === index ? { ...m, open: !m.open } : m)));

                setMarkersEdited();
              }}
            >
              <i className="fa fa-times fa-popup fa-popup-times" aria-hidden="true"></i>
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mb-0 text-center">Date Travelled</label>
            <input
              type="date"
              name="date"
              className="cust-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mb-0">Notes</label>
            <textarea name="notes" className="cust-input" value={notes} onChange={(e) => setNotes(e.target.value)} />
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
              {image ? 'Change Image' : 'Upload Image'}
            </label>
            {image && (
              <div className="img-wrapper">
                <img src={image} />
              </div>
            )}
          </div>
          {/* {msg && status === 400 && <div className="err-div mb-2">{msg}</div>} */}
          {/* <button className="gen-btn popup-submit">{msg === 'Saved!' ? 'Saved!' : 'Save Changes'}</button> */}
        </form>
      ) : (
        <>
          {!title && !date && !notes && !image && (
            <div className="popup-section">
              <p>Click on the pencil icon to add some details!</p>
            </div>
          )}
          {title && (
            <div className="popup-section">
              <label className="mb-0">Title</label>
              <p>{title}</p>
            </div>
          )}

          {date && (
            <div className="popup-section">
              <label className="mb-0 text-center">Date Travelled</label>
              <p>{date}</p>
            </div>
          )}

          {notes && (
            <div className="popup-section">
              <label className="mb-0">Notes</label>
              <p>{notes}</p>
            </div>
          )}

          {image && (
            <div className="img-section">
              {image && (
                <div className="img-wrapper">
                  <img src={image} className="" />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MarkerPopup;
