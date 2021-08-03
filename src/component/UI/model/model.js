import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../input/button";
const model = props => {
  return (
    <Modal show={props.show} onHide={props.cancelClicked}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" clicked={props.cancelClicked}>
          Close
        </Button>
        <Button variant="primary" clicked={props.submitClicked}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default model;
