import React from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
export default function TwoLeVFormNavPane(
  decreaseCounter,
  increaseCounter,
  butVisib,
  handleEntrySelection,
  ...props
) {
  return (
    <>
      <Row className="bottomFormRow">
        <Col xs={1}></Col>
        <Col xs={2}>
          <Button disabled={butVisib}>Previous</Button>
        </Col>
        <Col xs={2}>Entry</Col>
        <Col xs={2}>
          <Form.Control
            type="text"
            readOnly={props.editMode}
            value={props.selectedEntry + 1}
            onChange={handleEntrySelection}
          />
        </Col>
        <Col xs={2}>of {props.entryAmount}</Col>
        <Col xs={2}>
          <Button disabled={butVisib}>Next</Button>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </>
  );
}
