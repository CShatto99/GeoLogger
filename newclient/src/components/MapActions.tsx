import { FC } from 'react';
// import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiRoadMapFill } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { IoEarthSharp } from 'react-icons/io5';
import { FaHighlighter } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const MapActionsContainer = styled.div`
  position: absolute;
  right 0;
  width: auto;
  height: auto;
  background-color: rgba(14, 16, 18, 0.6);
  margin: 5rem 0.5rem 0 0;
  padding: 0.5rem;
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const MapAction = styled.div`
  & > svg {
    font-size: 1.5rem;
  }

  & > svg:hover > path,
  > svg:hover {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.primary};
    transition: ease-in 100ms;
  }

  & > svg,
  > svg > path {
    fill: ${({ theme }) => theme.colors.white};
    transition: ease-out 100ms;
  }
`;

const MapActions: FC = () => {
  return (
    <MapActionsContainer>
      <MapAction>
        <IoMdAddCircle data-tip data-for="add-action" />
        <ReactTooltip id="add-action" aria-haspopup="true">
          <small>Add a Highlight</small>
        </ReactTooltip>
      </MapAction>
      <MapAction>
        <RiRoadMapFill data-tip data-for="marker-action" />
        <ReactTooltip id="marker-action" aria-haspopup="true">
          <small>Add a Marker</small>
        </ReactTooltip>
      </MapAction>
      <MapAction>
        <FaHighlighter data-tip data-for="highlight-action" />
        <ReactTooltip id="highlight-action" aria-haspopup="true">
          <small>Map Highlight Color</small>
        </ReactTooltip>
      </MapAction>
      <MapAction>
        <IoEarthSharp data-tip data-for="settings-action" />
        <ReactTooltip id="settings-action" aria-haspopup="true">
          <small>Map Style</small>
        </ReactTooltip>
      </MapAction>
    </MapActionsContainer>
  );
};

export default MapActions;
