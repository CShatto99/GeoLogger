import { FC, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { IoMdAddCircle } from 'react-icons/io';

const AddHighlight: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IoMdAddCircle data-tip data-for="add-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="add-action" aria-haspopup="true">
        <small>Add a Highlight</small>
      </ReactTooltip>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>Add Some States</ModalHeader>
        <ModalBody>ADD HIGHLIGHTS</ModalBody>
      </Modal>
    </>
  );
};

export default AddHighlight;
