import { FC, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoMdAddCircle } from 'react-icons/io';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile } from '../../../store/profile';
import GeoLoggerModal from '../../GeoLoggerModal';
import CardLabel from '../../styles/CardLabel';
import usa from '../../../json/US.json';

const Checklist = styled.div`
  & > div {
    margin-bottom: 0.5rem;
  }

  & > div > div {
    border-radius: 0.3rem;
    padding: 0.5rem 0.75rem;
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

const AddHighlight: FC = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
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

  console.log(visited, profile.visited);

  return (
    <>
      <IoMdAddCircle data-tip data-for="add-action" onClick={() => setIsOpen(!isOpen)} />
      <ReactTooltip id="add-action" aria-haspopup="true">
        <small>Add a Highlight</small>
      </ReactTooltip>
      <GeoLoggerModal
        title="Add Highlights"
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        toggler={
          !arrayEquals(visited, profile.visited) && (
            <ApplyButton onClick={onSubmit}>
              <BsCheck />
            </ApplyButton>
          )
        }
      >
        {usa.map((region: { name: string; 'alpha-2': string }) => (
          // <ChecklistItem
          //   key={region.name}
          //   id={region.name}
          //   // onClick={() => handleClick(region.name)}
          //   color="light"
          // >
          //   {region.name}
          //   {/* {state.visited.includes(region.name) && <span className="float-right text-success">VISITED</span>} */}
          // </ChecklistItem>
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
