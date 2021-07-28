import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { FaHighlighter } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import CustomHighlight from '../../common/CustomHighlight';
import { ColorBox } from '../../profile/createProfile/CreateProfile';
import CardLabel from '../../common/CardLabel';
import GeoLoggerModal from '../../common/GLModal';
import GLTooltip from '../../common/GLTooltip';
import colors from '../../../assets/json/colors.json';

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
      <GLTooltip content="Map Highlight Color">
        <FaHighlighter onClick={() => dispatch(updateMapActionStatus([false, false, true, false]))} />
      </GLTooltip>
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
        <CustomHighlight
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFillColor(e.target.value)}
          fillColor={fillColor}
        />
      </GeoLoggerModal>
    </>
  );
};

export default HighlightColor;
