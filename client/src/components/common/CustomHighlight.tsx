import { FC } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { AuthInput } from './Inputs';
import { DefaultLinkHTML } from './Links';

const CustomHighlightContainer = styled.div`
  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;
const ColorContainer = styled.div`
  width: 38px;
  height: 38px;
  // background-color: red;
  margin-top: 0.25rem;
  border-radius: 0.3rem 0 0 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  box-sizing: border-box;
  border-right: none;
  display: grid;
  place-items: center;

  & > svg {
    fill: ${({ theme }) => theme.colors.danger};
    font-size: 1.5rem;
  }
`;

const HexInput = styled.div`
  display: flex;
  align-items: center;

  & > label {
    margin-right: 0.25rem;
  }

  & > input {
    border-radius: 0 0.3rem 0.3rem 0;
    border-left: none;
  }
`;

type MarkerPopupProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  fillColor: string;
};

const CustomHighlight: FC<MarkerPopupProps> = ({ onChange, fillColor }: MarkerPopupProps) => {
  const isValidHex = () => /^#([0-9A-F]{3}){1,2}$/i.test(fillColor);

  return (
    <CustomHighlightContainer>
      <p>
        Not seeing your favorite color? Click{' '}
        <DefaultLinkHTML href="https://htmlcolorcodes.com/color-picker/" target="_blank" rel="noopener noreferrer">
          here
        </DefaultLinkHTML>{' '}
        for hex color codes and enter the 6-digit hex code below:
      </p>
      <HexInput>
        <ColorContainer style={{ backgroundColor: !isValidHex() ? '#fff' : fillColor }}>
          {!isValidHex() ? <IoCloseSharp title="Invalid Hex Color" /> : null}
        </ColorContainer>
        <AuthInput type="text" value={'#' + fillColor.slice(1, fillColor.length)} maxLength={7} onChange={onChange} />
      </HexInput>
    </CustomHighlightContainer>
  );
};

export default CustomHighlight;
