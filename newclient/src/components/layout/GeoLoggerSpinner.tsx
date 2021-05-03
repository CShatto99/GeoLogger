import { FC } from 'react';
import styled from 'styled-components';

const GeoLoggerSpinnerStyle = styled.div`
  height: 7rem;
  width: 7rem;
  border-top: 3px solid #2b6cb0;
  border-radius: 50%;
  box-shadow: 0 0 2pt 2pt #1a202c;

  -webkit-animation: spin 700ms linear infinite;
  -moz-animation: spin 700ms linear infinite;
  animation: spin 700ms linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const GeoLoggerSpinner: FC = () => {
  return <GeoLoggerSpinnerStyle />;
};

export default GeoLoggerSpinner;
