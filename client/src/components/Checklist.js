import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  Form,
  Button,
  Row,
} from "reactstrap";
import usa from "../json/US.json";
import { updateProfile } from "../store/profile";
import "../css/checklist.css";

const Checklist = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const [state, setState] = useState({
    isOpen: false,
    visited: [],
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

  const onSubmit = e => {
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

  const onClick = region => {
    !state.visited.includes(region)
      ? setState({
          ...state,
          visited: [...state.visited, region],
        })
      : setState({
          ...state,
          visited: state.visited.filter(element => element !== region),
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
          <Form onSubmit={e => onSubmit(e)}>
            <Button color="dark" className="mb-2" block>
              Save
            </Button>
            {!loading && (
              <ListGroup>
                {usa.map(region => (
                  <Button
                    key={region.name}
                    id={region.name}
                    className="text-left"
                    onClick={() => onClick(region.name)}
                    color="light"
                    block
                  >
                    {region.name}
                    {state.visited.includes(region.name) ? (
                      <span className="float-right text-success">VISITED</span>
                    ) : (
                      ""
                    )}
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
