import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function MyModal({
  modalAction1,
  modalAction2,
  sucButText,
  donButText,
  ...props
}) {
  const showButtons = () => {
    if (props.buttnos === 2) {
      return (
        <>
          <Button variant="success" onClick={modalAction1}>
            {sucButText}
          </Button>
          <Button variant="danger" onClick={modalAction2}>
            {donButText}
          </Button>
        </>
      );
    } else if (props.buttnos === 1) {
      return (
        <Button variant="success" onClick={modalAction1}>
          {sucButText}
        </Button>
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.content}</p>
      </Modal.Body>
      <Modal.Footer>{showButtons()}</Modal.Footer>
    </Modal>
  );
}
