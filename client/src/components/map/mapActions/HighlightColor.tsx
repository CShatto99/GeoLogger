import { FC, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { FaHighlighter } from 'react-icons/fa';
import { ColorBox } from '../../profile/CreateProfile';
import { DefaultLinkHTML } from '../../styles/Links';
import CardLabel from '../../styles/CardLabel';
import { AuthInput } from '../../styles/Inputs';
import GeoLoggerModal from '../../GLModal';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import colors from '../../../json/colors.json';
import { BsCheck } from 'react-icons/bs';

const ColorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ApplyButton = styled.div`
  & > svg {
    stroke: ${({ theme }) => theme.colors.success};
    stroke-width: 2px;
    cursor: pointer;
    transition: all 100ms ease-out;
  }

  & > svg:hover {
    transform: scale(1.4);
    transition: all 100ms ease-in;
  }
`;

const HexInput = styled.div`
  display: flex;
  align-items: center;

  & > label {
    margin-right: 0.25rem;
  }
`;

const HighlightColor: FC = () => {
  const dispatch = useAppDispatch();
  const { profile, actionsStatus, loading } = useAppSelector((state) => state.profile);
  const [fillColor, setFillColor] = useState('');

  useEffect(() => {
    setFillColor(profile.fillColor);
  }, [profile]);

  const onSubmit = () => {
    dispatch(updateProfile({ ...profile, ...{ fillColor } }));
  };

  return (
    <>
      <FaHighlighter
        data-tip
        data-for="highlight-action"
        onClick={() => dispatch(updateMapActionStatus([false, false, true, false]))}
      />
      <ReactTooltip id="highlight-action" effect="solid" aria-haspopup="true">
        <small>Map Highlight Color</small>
      </ReactTooltip>
      <GeoLoggerModal
        title="Highlight Color"
        isOpen={actionsStatus[2]}
        onClose={() => dispatch(updateMapActionStatus([false, false, false, false]))}
        toggler={
          !loading &&
          fillColor !== profile.fillColor && (
            <ApplyButton onClick={onSubmit}>
              <BsCheck />
            </ApplyButton>
          )
        }
      >
        <ColorContent>
          {colors.map(({ name, hex }) => (
            <ColorBox
              key={hex}
              className={fillColor === hex ? 'item-active' : undefined}
              onClick={() => setFillColor(hex)}
              style={{
                backgroundColor: hex,
              }}
            >
              <CardLabel label={name} active={fillColor === hex} />
            </ColorBox>
          ))}
        </ColorContent>
        <p style={{ marginBottom: '0.5rem' }}>
          Not seeing your favorite color? Click{' '}
          <DefaultLinkHTML href="https://htmlcolorcodes.com/color-picker/" target="_blank" rel="noopener noreferrer">
            here
          </DefaultLinkHTML>{' '}
          for hex color codes and enter the 6-digit hex code below:
        </p>
        <HexInput>
          <label>#</label>
          <AuthInput
            type="text"
            value={fillColor.slice(1, fillColor.length)}
            maxLength={6}
            onChange={(e) => setFillColor('#' + e.target.value)}
          />
        </HexInput>
      </GeoLoggerModal>
    </>
  );
};

export default HighlightColor;
