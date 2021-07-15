import { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { IoCloseSharp, IoDownloadOutline } from 'react-icons/io5';
import GLTooltip from './GLTooltip';

const ExpandedImageRoot = styled.div`
  & > .show {
    opacity: 1;
    pointer-events: visible;
  }

  & > .show > div {
    transform: translateY(0);
  }
`;

const ExpandedImageContainer = styled.div`
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
  padding: 5.5rem 0 0 0;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 5.5rem 1rem 1rem 1rem;

    & svg {
      font-size: 1.2rem !important;
    }
  }
`;

const ExpandedImageContent = styled.div`
  transform: translateY(-200px);
  transition: all 300ms ease-in-out;
  width: 700px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`;

const ExpandedImageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(14, 16, 18, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 0.3rem 0.3rem 0 0;
  color: #fff;
  margin-bottom: 0.5rem;

  & svg {
    cursor: pointer;
    font-size: 1.5rem;
  }

  & > svg > path {
    transition: fill 100ms ease-out;
  }

  & > svg:hover > path {
    fill: ${({ theme }) => theme.colors.danger};
    transition: fill 100ms ease-in;
  }
`;

const ExpandedImageTitle = styled.div`
  display: flex;
  align-items: center;

  & > h2 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: 1.4rem;
    margin-right: 0.5rem;
  }

  & a {
    color: #fff;
  }

  & a > svg {
    transition: stroke 100ms ease-out;
  }

  & a > svg:hover {
    stroke: ${({ theme }) => theme.colors.primary};
    transition: stroke 100ms ease-in;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    & > h2 {
      font-size: 1rem;
    }
  }
`;

const ExpandedImageBody = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  border-radius: 0 0 0.3rem 0.3rem;

  & img {
    box-shadow: none;
    border-radius: 0 0 0.3rem 0.3rem !important;
    max-height: calc(100vh - 11rem);
    width: auto;
    max-width: 700px;
  }
`;

type ExpandedImageProps = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<unknown> | undefined;
  title?: string;
  src?: string;
};

const ExpandedImage: FC<ExpandedImageProps> = ({ isOpen, onClose, title, src }: ExpandedImageProps) => {
  const portalDiv = document.getElementById('root');

  return portalDiv
    ? ReactDOM.createPortal(
        <ExpandedImageRoot>
          <ExpandedImageContainer onClick={onClose} className={`ExpandedImage ${isOpen ? 'show' : ''}`}>
            <ExpandedImageContent onClick={(e) => e.stopPropagation()}>
              <ExpandedImageHeader>
                <ExpandedImageTitle>
                  <h2>{title}</h2>
                  <GLTooltip content="Download">
                    <a href={src} download={`${title}.png`}>
                      <IoDownloadOutline />
                    </a>
                  </GLTooltip>
                </ExpandedImageTitle>
                <IoCloseSharp onClick={onClose} />
              </ExpandedImageHeader>
              <ExpandedImageBody>
                <img src={src} />
              </ExpandedImageBody>
            </ExpandedImageContent>
          </ExpandedImageContainer>
        </ExpandedImageRoot>,
        portalDiv,
      )
    : null;
};

export default ExpandedImage;
