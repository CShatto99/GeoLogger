import { FC } from 'react';
import styled from 'styled-components';
import AddHighlight from './AddHighlight';
import AddMarker from './AddMarker';
import HighlightColor from './HighlightColor';
import MapStyle from './MapStyle';

const MapActionsContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: auto;
  height: auto;
  background-color: rgba(14, 16, 18, 0.6);
  margin: 5rem 0.5rem 0 0;
  padding: 0.5rem;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  z-index: 1;

  & > div:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const MapAction = styled.div`
  & svg {
    font-size: 1.5rem;
  }

  & svg:focus {
    outline: none;
  }

  & svg:hover > path,
  svg:hover {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.primary};
    transition: ease-in 100ms;
  }

  & svg,
  svg > path {
    fill: ${({ theme }) => theme.colors.white};
    transition: ease-out 100ms;
  }
`;

const MapActions: FC = () => {
  return (
    <MapActionsContainer>
      <MapAction>
        <AddHighlight />
      </MapAction>
      <MapAction>
        <AddMarker />
      </MapAction>
      <MapAction>
        <HighlightColor />
      </MapAction>
      <MapAction>
        <MapStyle />
      </MapAction>
    </MapActionsContainer>
  );
};

export default MapActions;
