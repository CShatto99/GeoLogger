import { FC } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  color: #2b6cb0;
`;

const Spinner = styled.div`
  border-radius: 50%;

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

type SpinnerProps = {
  size?: string;
  borderWidth?: string;
};

const GeoLoggerSpinner: FC<SpinnerProps> = ({ size = '7rem', borderWidth = '1rem' }: SpinnerProps) => {
  return (
    <SpinnerContainer>
      <Spinner
        style={{
          height: `${size}`,
          width: `${size}`,
          border: `${borderWidth} solid ${theme.colors.white}`,
          borderTop: `${borderWidth} solid ${theme.colors.primary}`,
        }}
      />
    </SpinnerContainer>
  );
};

export default GeoLoggerSpinner;
