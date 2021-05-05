import { FC, useState } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { IoCloseSharp } from 'react-icons/io5';
import { FaHighlighter } from 'react-icons/fa';

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

const HighlightColor: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FaHighlighter data-tip data-for="highlight-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="highlight-action" aria-haspopup="true">
        <small>Map Highlight Color</small>
      </ReactTooltip>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        contentLabel="Change Highlight Modal"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        style={modalStyles}
      >
        CHANGE HIGHLIGHT COLOR
        <IoCloseSharp onClick={() => setIsOpen(!isOpen)} />
      </Modal>
    </>
  );
};

export default HighlightColor;
