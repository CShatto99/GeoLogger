import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import GeneralInput, { Textarea } from '../styles/Inputs';
import { IoCloseSharp } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../store';
import { setAlert } from '../../store/alert';
import { updateProfile } from '../../store/profile';
import { MarkerType } from '../../store/types';
import { ApplyButton } from '../styles/Buttons';
import GenDivider from '../styles/Divider';
import getBase64 from '../../utils/handleFile';

const PopupContainer = styled.div`
  max-width: 300px;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;

  & > svg {
    font-size: 1.4rem;
  }
`;

const PopupActions = styled.div`
  display: flex;

  & > div {
    cursor: pointer;
  }

  & > div:first-child {
    margin-right: 0.5rem;
  }

  & > div > svg > path {
    transition: all 100ms ease-out;
  }

  & > div:hover > svg > path {
    transition: all 100ms ease-in;
  }

  & > div:first-child:hover > svg > path {
    fill: ${({ theme }) => theme.colors.danger};
  }

  & > div:last-child:hover > svg > path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled(GenDivider)`
  margin-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;

  & > input,
  textarea {
    margin-top: 0.1rem;
  }
`;

const ImageSection = styled.div`
  & > label > input {
    display: none;
  }
`;

const ImageUpload = styled.div`
  width: 100%;
  color: #edf2f7;
  border-radius: 0.3rem;
  padding: 0.25rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: ease-out 100ms;
  box-sizing: border-box;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
    transition: ease-in 100ms;
  }
`;

const ImageContainer = styled.div`
  max-width: 300px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  & > img {
    box-shadow: none;
  }
`;

const PopupSection = styled.div`
  max-width: 300px;
  word-wrap: break-word;

  & > h3 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: 1.1rem;
    word-wrap: break-word;
    margin-bottom: 0.25rem;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

type MarkerPopupProps = {
  marker: MarkerType;
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
};

const MarkerPopup: FC<MarkerPopupProps> = ({ marker, onClick }: MarkerPopupProps) => {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);

  const [title, setTitle] = useState(marker.title);
  const [date, setDate] = useState(marker.date);
  const [notes, setNotes] = useState(marker.notes);
  const [image, setImage] = useState(marker.image);
  const [editing, setEditing] = useState(false);

  const markerEdited = () =>
    !loading && (title !== marker.title || date !== marker.date || notes !== marker.notes || image !== marker.notes);

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

    dispatch(
      updateProfile({
        ...profile,
        ...{ markers: profile.markers.map((m: MarkerType) => (m.id === marker.id ? { ...m, ...newMarker } : m)) },
      }),
    );
  };

  console.log(markerEdited());

  return (
    <>
      <PopupContainer>
        <PopupButtons>
          <PopupActions>
            <div>
              <FaTrashAlt data-tip data-for="delete-marker" />
              <ReactTooltip id="delete-marker" effect="solid">
                <small>Delete</small>
              </ReactTooltip>
            </div>
            <div>
              <FaPencilAlt data-tip data-for="edit-marker" onClick={() => setEditing(!editing)} />
              <ReactTooltip id="edit-marker" effect="solid">
                <small>Edit</small>
              </ReactTooltip>
            </div>
          </PopupActions>
          {markerEdited() ? (
            <ApplyButton>
              <BsCheck
                onClick={(e) => {
                  onSubmit(e);
                  onClick(null);
                }}
              />
            </ApplyButton>
          ) : (
            <IoCloseSharp onClick={() => onClick(null)} />
          )}
        </PopupButtons>
        <Divider />
      </PopupContainer>
      {editing ? (
        <form onSubmit={onSubmit}>
          <FormGroup>
            <label>Title</label>
            <GeneralInput type="text" value={title} maxLength={30} onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Date Travelled</label>
            <GeneralInput type="date" value={date} maxLength={50} onChange={(e) => setDate(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Notes</label>
            <Textarea value={notes} maxLength={280} onTextareaChange={(e) => setNotes(e.target.value)} />
          </FormGroup>
          <ImageSection>
            <label>
              <input
                type="file"
                name="image"
                className="file-upload"
                onChange={handleFileUpload}
                accept=".jpg, .jpeg, .png"
              />
              <ImageUpload>{image ? 'Change Image' : 'Upload Image'}</ImageUpload>
            </label>
            {image && (
              <ImageContainer>
                <img src={image} />
              </ImageContainer>
            )}
          </ImageSection>
          {/* {msg && status === 400 && <div className="err-div mb-2">{msg}</div>} */}
          {/* <button className="gen-btn popup-submit">{msg === 'Saved!' ? 'Saved!' : 'Save Changes'}</button> */}
        </form>
      ) : (
        <>
          {!title && !date && !notes && !image && (
            <PopupSection>
              <p>Click on the pencil icon to add some details!</p>
            </PopupSection>
          )}
          {date && (
            <PopupSection style={{ marginBottom: '0.5rem' }}>
              {title && <h3>{title}</h3>}
              {date && <p>{date}</p>}
            </PopupSection>
          )}
          {notes && (
            <PopupSection>
              <p>{notes}</p>
            </PopupSection>
          )}
          {image && (
            <ImageContainer>
              <img src={image} />
            </ImageContainer>
          )}
        </>
      )}
    </>
  );
};

export default MarkerPopup;
