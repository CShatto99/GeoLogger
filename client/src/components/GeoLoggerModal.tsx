import { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

const ModalRoot = styled.div`
  & > .show {
    opacity: 1;
    pointer-events: visible;
  }

  & > .show > div {
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  opacity: 0;
  transition: all 300ms ease-in-out;
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 12rem;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 12rem 1.5rem 0 1.5rem;
  }
`;

const ModalContent = styled.div`
  transform: translateY(-200px);
  transition: all 300ms ease-in-out;
  width: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3rem;
  padding: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;

  & > h2 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & > svg {
    cursor: pointer;
  }

  & > svg > path {
    transition: fill 100ms ease-out;
  }

  & > svg:hover > path {
    fill: ${({ theme }) => theme.colors.danger};
    transition: fill 100ms ease-in;
  }
`;

const ModalBody = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.darkBorder};
  line-height: 1.3rem;
`;

type ModalProps = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<unknown> | undefined;
  title?: string;
  children?: React.ReactNode;
};

const GeoLoggerModal: FC<ModalProps> = ({ isOpen, onClose, title, children }: ModalProps) => {
  const portalDiv = document.getElementById('root');

  return portalDiv
    ? ReactDOM.createPortal(
        <ModalRoot>
          <ModalContainer onClick={onClose} className={`modal ${isOpen ? 'show' : ''}`}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>{title}</h2>
                <IoCloseSharp onClick={onClose} />
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </ModalContainer>
        </ModalRoot>,
        portalDiv,
      )
    : null;
};

export default GeoLoggerModal;
