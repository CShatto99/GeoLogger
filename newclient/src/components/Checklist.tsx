import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index';
import { Modal, ModalHeader, ModalBody, ListGroup, Form, Button } from 'reactstrap';
import usa from '../json/US.json';
import { updateProfile } from '../store/profile';
//import '../css/checklist.css';

const Checklist: FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);
  const [state, setState] = useState<{
    isOpen: boolean;
    theme: string;
    fillColor: string;
    visited: string[];
    mapStyle: string;
  }>({
    isOpen: false,
    theme: '',
    fillColor: '',
    visited: [],
    mapStyle: '',
  });

  useEffect(() => {
    if (!loading)
      setState({
        ...state,
        theme: profile.theme,
        fillColor: profile.fillColor,
        visited: [...profile.visited],
        mapStyle: profile.mapStyle,
      });
  }, [profile]);

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen,
    });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updatedProfile = {
      theme: state.theme,
      fillColor: state.fillColor,
      visited: state.visited,
      mapStyle: state.mapStyle,
    };

    dispatch(updateProfile({ ...profile, ...updatedProfile }));

    toggle();
  };

  const handleClick = (region: string) => {
    !state.visited.includes(region)
      ? setState({
          ...state,
          visited: [...state.visited, region],
        })
      : setState({
          ...state,
          visited: state.visited.filter((element) => element !== region),
        });
  };

  return (
    <>
      <button className="gen-btn primary-btn mr-2" onClick={toggle}>
        Add States
      </button>
      <Modal isOpen={state.isOpen}>
        <ModalHeader className="text-black" toggle={toggle}>
          Add Some States
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <Button color="dark" className="mb-2" block>
              Save
            </Button>
            {!loading && (
              <ListGroup>
                {usa.map((region) => (
                  <Button
                    key={region.name}
                    id={region.name}
                    className="text-left"
                    onClick={() => handleClick(region.name)}
                    color="light"
                    block
                  >
                    {region.name}
                    {state.visited.includes(region.name) && <span className="float-right text-success">VISITED</span>}
                  </Button>
                ))}
              </ListGroup>
            )}
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Checklist;
