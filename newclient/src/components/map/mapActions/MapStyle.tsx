import { FC, useState } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { IoCloseSharp } from 'react-icons/io5';
import { IoEarthSharp } from 'react-icons/io5';

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

const MapStyle: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IoEarthSharp data-tip data-for="settings-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="settings-action" aria-haspopup="true">
        <small>Map Style</small>
      </ReactTooltip>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        contentLabel="Change Map Style Modal"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        style={modalStyles}
      >
        CHANGE MAP STYLE
        <IoCloseSharp onClick={() => setIsOpen(!isOpen)} />
      </Modal>
    </>
  );
};

export default MapStyle;
