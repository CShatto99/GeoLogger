import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearAlert, setAlert } from '../../../../store/alert';
import { updateProfile } from '../../../../store/profile';
import { MarkerType } from '../../../../store/types';
import ExpandedImage from '../../../common/ExpandedImage';
import GLModal from '../../../common/GLModal';
import { ApplyButton, DangerButton } from '../../../common/Buttons';
import GenDivider from '../../../common/styles/Divider';
import GLTooltip from '../../../common/GLTooltip';
import GeneralInput, { Textarea } from '../../../common/Inputs';
import getBase64 from '../../../../utils/handleFile';
import getReadableDate from '../../../../utils/getReadableData';

const PopupContainer = styled.div`
  max-width: 300px;
  cursor: default;
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

  & > div:first-child > div:first-child {
    margin-right: 0.5rem;
  }

  & > div {
    cursor: pointer;
  }

  & > div:first-child:hover svg {
    fill: ${({ theme }) => theme.colors.danger};
  }

  & > div:last-child:hover svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const PopupAction = styled.div`
  & > div > svg:focus {
    outline: none;
  }

  & > div > svg > path {
    transition: all 100ms ease-out;
  }

  & > div:hover > svg > path {
    transition: all 100ms ease-in;
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

  & > button {
    margin-top: 0.5rem;
    width: 100%;
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
  border-radius: 3px;
  background-color: #000;
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  cursor: pointer;

  & > img {
    box-shadow: none;
    max-width: 300px;
    max-height: 300px;
    width: auto;
    border-radius: 0;
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
    font-size: 0.9rem;
    line-height: 1rem;
  }
`;

const CloseButton = styled(ApplyButton)`
  & > svg:hover {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

const ModalBody = styled.div`
  & > button {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

type MarkerPopupProps = {
  marker: MarkerType;
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
};

const MarkerPopup: FC<MarkerPopupProps> = ({ marker: m, onClick }: MarkerPopupProps) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { SUCC_POPUP_IMG } = useAppSelector((state) => state.alert);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState<string | undefined>(m.title);
  const [date, setDate] = useState<any>(m.date);
  const [notes, setNotes] = useState<string | undefined>(m.notes);
  const [image, setImage] = useState<string | undefined>(m.image);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(false);
    setTitle(m.title);
    setDate(m.date);
    setNotes(m.notes);
    setImage(m.image);
  }, [m]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64 = await getBase64(e);
    typeof base64 === 'string' ? dispatch(setAlert(base64, 'ERR_CHANGE_PASSWORD', 400)) : setImage(base64.result);
    dispatch(setAlert('Image Saved!', 'SUCC_POPUP_IMG', 200));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };

  const onDelete = () => {
    dispatch(
      updateProfile({
        ...profile,
        ...{ markers: profile.markers.filter((marker: MarkerType) => marker._id !== m._id) },
      }),
    );

    onClick(null);
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
        ...{
          markers: profile.markers.map((marker: MarkerType) =>
            marker._id === m._id ? { ...marker, ...newMarker } : marker,
          ),
        },
      }),
    );

    onClick({ ...m, ...newMarker });
  };

  return (
    <>
      <PopupContainer>
        <PopupButtons>
          <PopupActions>
            <PopupAction>
              <GLTooltip content="Delete">
                <FaTrashAlt onClick={() => setIsOpen(true)} />
              </GLTooltip>
              <GLModal
                title="Are you sure you want to delete this marker?"
                isOpen={isOpen}
                onClose={() => setIsOpen(!isOpen)}
              >
                <ModalBody>
                  <p>All data associated with this marker will be permanently erased.</p>
                  <DangerButton onClick={() => onDelete()}>Delete Marker</DangerButton>
                </ModalBody>
              </GLModal>
            </PopupAction>
            <PopupAction>
              <GLTooltip content="Edit">
                <FaPencilAlt onClick={() => setEditing(!editing)} />
              </GLTooltip>
            </PopupAction>
          </PopupActions>
          {editing ? (
            <ApplyButton>
              <BsCheck
                onClick={(e) => {
                  onSubmit(e);
                  setEditing(false);
                }}
              />
            </ApplyButton>
          ) : (
            <CloseButton>
              <IoCloseSharp onClick={() => onClick(null)} />
            </CloseButton>
          )}
        </PopupButtons>
        <Divider />
      </PopupContainer>
      {editing ? (
        <form>
          <FormGroup>
            <label>Title</label>
            <GeneralInput type="text" value={title} maxLength={30} onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Date Travelled</label>
            <GeneralInput
              type="date"
              value={date}
              maxLength={50}
              style={{ minHeight: '32px' }}
              onChange={(e) => setDate(e.target.value)}
            />
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
              <ImageUpload>{SUCC_POPUP_IMG ? SUCC_POPUP_IMG : image ? 'Change Image' : 'Upload Image'}</ImageUpload>
            </label>
            {image && (
              <DangerButton type="button" onClick={() => setImage('')}>
                Remove Image
              </DangerButton>
            )}
          </ImageSection>
        </form>
      ) : (
        <>
          {!title && !date && !notes && !image && (
            <PopupSection>
              <p style={{ textAlign: 'center' }}>Click on the pencil icon to add some details!</p>
            </PopupSection>
          )}
          {image && (
            <ImageContainer
              style={{ marginBottom: notes || date ? '0.5rem' : '0' }}
              onClick={() => setIsExpanded(true)}
            >
              <img src={image} />
              <ExpandedImage title={title} src={image} isOpen={isExpanded} onClose={() => setIsExpanded(false)} />
            </ImageContainer>
          )}
          {date && (
            <PopupSection style={{ marginBottom: notes ? '0.5rem' : '0' }}>
              {title && <h3>{title}</h3>}
              {date && <p>{getReadableDate(new Date(date))}</p>}
            </PopupSection>
          )}
          {notes && (
            <PopupSection>
              <p>{notes}</p>
            </PopupSection>
          )}
        </>
      )}
    </>
  );
};

export default MarkerPopup;
