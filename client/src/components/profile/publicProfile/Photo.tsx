import { FC, useState } from 'react';
import styled from 'styled-components';
import ExpandedImage from './../../common/ExpandedImage';

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    box-shadow: none;
    cursor: pointer;
    max-height: calc(100vh - 12rem);
    width: auto;
    max-width: 100%;
  }
`;

type PhotoProps = {
  title?: string;
  image?: string;
};

const Photo: FC<PhotoProps> = ({ title, image }: PhotoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <PhotoContainer>
      <img src={image} alt={title} onClick={() => setIsExpanded(true)} />
      <ExpandedImage title={title} src={image} isOpen={isExpanded} onClose={() => setIsExpanded(false)} />
    </PhotoContainer>
  );
};

export default Photo;
