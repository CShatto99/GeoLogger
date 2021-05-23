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
  z-index: 2;
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
  padding: 6rem 0 1.5rem 0;
  overflow: scroll;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 6rem 1.5rem 1.5rem 1.5rem;
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
  align-items: center;
  padding-bottom: 1rem;

  & > h2 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: 1.4rem;
  }

  & > div > svg {
    cursor: pointer;
    height: 100%;
  }

  & > div > svg > path {
    transition: fill 100ms ease-out;
  }

  & > div > svg:hover > path {
    fill: ${({ theme }) => theme.colors.danger};
    transition: fill 100ms ease-in;
  }
`;

const ModalBody = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 1.3rem;
`;

type ModalProps = {
  isOpen?: boolean;
  onClose?: React.MouseEventHandler<unknown> | undefined;
  title?: string;
  children?: React.ReactNode;
  toggler?: React.ReactNode;
};

const GLModal: FC<ModalProps> = ({ isOpen, onClose, title, children, toggler }: ModalProps) => {
  const portalDiv = document.getElementById('root');

  return portalDiv
    ? ReactDOM.createPortal(
        <ModalRoot>
          <ModalContainer onClick={onClose} className={`modal ${isOpen ? 'show' : ''}`}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>{title}</h2>
                {toggler ? (
                  <div onClick={onClose}>{toggler}</div>
                ) : (
                  <div>
                    <IoCloseSharp onClick={onClose} />
                  </div>
                )}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </ModalContainer>
        </ModalRoot>,
        portalDiv,
      )
    : null;
};

export default GLModal;
