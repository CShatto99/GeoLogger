import { FC, useState } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { IoCloseSharp } from 'react-icons/io5';
import { RiRoadMapFill } from 'react-icons/ri';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const AddMarker: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RiRoadMapFill data-tip data-for="marker-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="marker-action" aria-haspopup="true">
        <small>Add a Marker</small>
      </ReactTooltip>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        contentLabel="Add Marker Modal"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={true}
        style={modalStyles}
      >
        ADD MARKER MODAL
        <IoCloseSharp onClick={() => setIsOpen(!isOpen)} />
      </Modal>
    </>
  );
};

export default AddMarker;
