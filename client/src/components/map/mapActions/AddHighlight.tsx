import { FC, useState } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { IoMdAddCircle } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

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

const AddHighlight: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IoMdAddCircle data-tip data-for="add-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="add-action" aria-haspopup="true">
        <small>Add a Highlight</small>
      </ReactTooltip>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        contentLabel="Add Highlight Modal"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        style={modalStyles}
      >
        ADD HIGHLIGHT MODAL
        <IoCloseSharp onClick={() => setIsOpen(!isOpen)} />
      </Modal>
    </>
  );
};

export default AddHighlight;
