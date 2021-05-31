import { FC, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoMdAddCircle } from 'react-icons/io';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import GeoLoggerModal from '../../GLModal';
import CardLabel from '../../styles/CardLabel';
import { ApplyButton } from '../../styles/Buttons';
import usa from '../../../json/US.json';

const Checklist = styled.div`
  & > div {
    margin-bottom: 0.75rem;
  }

  & > div > div {
    border-radius: 0.3rem;
    padding: 0.5rem 0.75rem;
  }
`;

const AddHighlight: FC = () => {
  const dispatch = useAppDispatch();
  const { profile, actionsStatus } = useAppSelector((state) => state.profile);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(profile.visited);
  }, [profile]);

  const arrayEquals = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) if (!a.includes(b[i])) return false;

    return true;
  };

  const handleClick = (region: string) => {
    !visited.includes(region)
      ? setVisited((prevVisited) => [...prevVisited, region])
      : setVisited((prevVisited) => prevVisited.filter((element) => element !== region));
  };

  const onSubmit = () => {
    dispatch(updateProfile({ ...profile, ...{ visited } }));
  };

  return (
    <>
      <IoMdAddCircle
        data-tip
        data-for="add-action"
        onClick={() => dispatch(updateMapActionStatus([true, false, false, false]))}
      />
      <ReactTooltip id="add-action" effect="solid" aria-haspopup="true">
        <small>Add a Highlight</small>
      </ReactTooltip>
      <GeoLoggerModal
        title="Add Highlights"
        isOpen={actionsStatus[0]}
        onClose={() => dispatch(updateMapActionStatus([false, false, false, false]))}
        toggler={
          !arrayEquals(visited, profile.visited) && (
            <ApplyButton onClick={onSubmit}>
              <BsCheck />
            </ApplyButton>
          )
        }
      >
        {usa.map((region: { name: string; 'alpha-2': string }) => (
          <Checklist key={region.name}>
            <CardLabel
              active={visited.includes(region.name)}
              label={region.name}
              onClick={() => handleClick(region.name)}
            />
          </Checklist>
        ))}
      </GeoLoggerModal>
    </>
  );
};

export default AddHighlight;
