import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FormControl, Row } from "react-bootstrap";
export default function LoadedPage(props) {
  const dataPack = props.data;
  const [labelCnt, setLabelCnt] = useState(0);
  const [labelVals, setLabelVals] = useState([]);
  const [currentElement, setCurrentElement] = useState(4);
  const [alertStatus, setAlertStatus] = useState({ elementNotInRange: false });
  const labelCaptions = props.customSettings.labelCaptions;
  const fileNames = props.customSettings.fileNames;
  const fileNameKeys = Object.keys(fileNames);

  // checks if a json label has a proper dectription stored in labelCaptions object
  const labelCaptionKeys = Object.keys(labelCaptions);

  const displayLabelName = (label) => {
    let labelToDisplay = label;
    labelCaptionKeys.forEach((element) => {
      if (element === label) {
        labelToDisplay = labelCaptions[element];
      }
    });
    return labelToDisplay;
  };

  const displayCustomFileName = (fileName) => {
    let labelToDisplay = fileName;
    fileNameKeys.forEach((element) => {
      if (element === fileName) {
        labelToDisplay = fileNames[element];
      }
    });
    return labelToDisplay;
  };

  const labelKeys = Object.keys(dataPack[0]);
  const labelCount = labelKeys.length;
  useEffect(() => {
    setLabelCnt(labelCount);
    setLabelVals(labelKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPlaceholder = (element) => {
    if (typeof element === "boolean") {
      if (element) {
        return "true";
      } else {
        return "false";
      }
    } else {
      return element;
    }
  };

  const checkInputType = (value) => {
    return typeof value === "string"
      ? "text"
      : typeof value === "number"
      ? "number"
      : typeof value === "boolean"
      ? "boolean"
      : "text";
  };

  const createAFormControlField = (element) => {
    const typeOfInput = checkInputType(dataPack[0][element]);

    return typeOfInput !== "boolean" ? (
      <Form.Control
        className="formField"
        type={typeOfInput}
        placeholder={checkPlaceholder(dataPack[currentElement][element])}
      />
    ) : (
      <FormControl as="select" values="to be fixed" className="formField">
        <option>Yes</option>
        <option>No</option>
      </FormControl>
    );
  };
  const drawFormFields = () => {
    return labelKeys.map((element, index) => (
      <div key={element}>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Form.Group controlId={element}>
              <Form.Label>{displayLabelName(element)}: </Form.Label>
              {createAFormControlField(element)}
            </Form.Group>
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    ));
  };

  const drawForm = () => {
    return <Form>{drawFormFields()}</Form>;
  };

  const alertMessages = {
    elementNotInRange: "Please enter the correct value",
  };

  const handleEntrySelector = (event) => {
    const entryValue = parseInt(event.target.value);
    if (entryValue >= 1 && entryValue <= dataPack.length) {
      setAlertStatus({ ...alertStatus, elementNotInRange: false });
      setCurrentElement(entryValue - 1);
    } else if (entryValue < 1) {
      setCurrentElement(0);
      setAlertStatus({ ...alertStatus, elementNotInRange: true });
    } else if (entryValue > dataPack.length) {
      setCurrentElement(dataPack.length - 1);
      setAlertStatus({ ...alertStatus, elementNotInRange: true });
    }
  };

  return (
    <div>
      <h1>{displayCustomFileName(props.fileName)}</h1>
      {drawForm()}
      <br />
      <Row>
        <Col sm={4}></Col>
        <Col sm={1}>Entry:</Col>
        <Col sm={1}>
          <FormControl
            className="itemIndex"
            type="number"
            placeholder={currentElement + 1}
            onChange={handleEntrySelector}
          />
        </Col>
        <Col sm={1}>of</Col>
        <Col sm={1}>{dataPack.length}</Col>
        <p className="alert">
          {alertStatus.elementNotInRange
            ? "Element not in range, please enter a correct value..."
            : ""}
        </p>
      </Row>
    </div>
  );
}
