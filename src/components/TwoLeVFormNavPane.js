import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { setCookie, getCookie, butVisib } from "../functions";
export default function TwoLeVFormNavPane({
  sendDataToParent,

  ...props
}) {
  const [selectedEntry, setSelectedEntry] = useState(props.selectedEntry);

  const entryAmount = props.entryAmount;
  const handleEntrySelection = (event) => {
    const typedValueIsNumber = Number(event.target.value);
    if (typedValueIsNumber) {
      if (typedValueIsNumber > 0 && typedValueIsNumber <= entryAmount) {
        setSelectedEntry(typedValueIsNumber - 1);
        setCookie("selectedEntry", typedValueIsNumber - 1, 14);
      }
    }
  };

  const increaseCounter = () => {
    if (selectedEntry < entryAmount - 1) {
      const newCounter = selectedEntry + 1;
      setSelectedEntry(newCounter);
      setCookie("selectedEntry", newCounter, 14);
    }
  };

  const decreaseCounter = () => {
    if (selectedEntry > 0) {
      const newCounter = selectedEntry - 1;
      setSelectedEntry(newCounter);
      setCookie("selectedEntry", newCounter, 14);
    }
  };

  useEffect(() => {
    const entryCookie = getCookie("selectedEntry");
    if (entryCookie !== "") {
      setSelectedEntry(Number(entryCookie));
    }
  }, []);

  useEffect(() => {
    sendDataToParent(selectedEntry);
  }, [selectedEntry]);

  useEffect(() => {
    setSelectedEntry(props.selectedEntry);
  }, [props.selectedEntry]);
  return (
    <>
      <Row className="bottomFormRow">
        <Col xs={1}></Col>
        <Col xs={2}>
          <Button
            disabled={butVisib(
              props.editMode,
              selectedEntry,
              entryAmount,
              "previous"
            )}
            onClick={decreaseCounter}
          >
            Previous
          </Button>
        </Col>
        <Col xs={2}>Entry</Col>
        <Col xs={2}>
          <Form.Control
            type="text"
            value={selectedEntry + 1}
            onChange={handleEntrySelection}
            readOnly={props.editMode}
          />
        </Col>
        <Col xs={2}>of {props.entryAmount}</Col>
        <Col xs={2}>
          <Button
            disabled={butVisib(
              props.editMode,
              selectedEntry,
              entryAmount,
              "next"
            )}
            onClick={increaseCounter}
          >
            Next
          </Button>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </>
  );
}
