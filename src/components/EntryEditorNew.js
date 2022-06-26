import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button, FormControl, Row } from "react-bootstrap";

import axios from "axios";

export default function EntryEditorNew(props) {
  //TakNieModal({naglowek, tresc, usuwanie, ...props})

  const [editMode, setEditMode] = useState(false);
  const [currentElement, setCurrentElement] = useState(3);
  const [alertStatus, setAlertStatus] = useState({ elementNotInRange: false });
  const labelCaptions = props.customSettings.labelCaptions;
  const fileNames = props.customSettings.fileNames;
  const fileNameKeys = Object.keys(fileNames);
  const [dataPack, setDataPack] = useState(props.data);

  // checks if a json label has a proper dectription stored in labelCaptions object
  const labelCaptionKeys = Object.keys(labelCaptions);
  const exampleRef = useRef(null);
  const exampleFunction = () => {
    // exampleRef.current.children[3].style.color = "red";
    exampleRef.current.children[2].children[0].children[0].children[1].children[0].children[1].value =
      "";
  };

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

  const createAFormControlField = (element, index) => {
    const typeOfInput = checkInputType(dataPack[0][element]);

    return typeOfInput !== "boolean" ? (
      <Form.Control
        className="formField"
        type={typeOfInput}
        readOnly={!editMode}
        value={checkPlaceholder(dataPack[currentElement][element])}
        onChange={(event) => handleChange(event, element)}
      />
    ) : (
      <FormControl
        as="select"
        defaultValue={dataPack[currentElement][element] ? "YES" : "NO"}
        className="formField"
        disabled={!editMode}
      >
        <option>YES</option>
        <option>NO</option>
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
              {createAFormControlField(element, index)}
            </Form.Group>
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    ));
  };

  const drawForm = () => {
    return (
      <Form>
        {drawFormFields()}
        <Button type="submit">Test</Button>{" "}
        <Button
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Form>
    );
  };

  const handleChange = (event, element) => {
    const updatedValues = [...dataPack];
    updatedValues[currentElement][element] = event.target.value;
    setDataPack(updatedValues);
    console.log(updatedValues);
  };

  const handleEntrySelect = (event) => {
    setCurrentElement(event.target.value);
  };

  const giveOptions = () => {
    return dataPack.map((value, key) => (
      <li key={key}>
        <br />
        Key: {key + 1}
      </li>
    ));
  };
  const onSubmit = (data) => {
    const url = props.customSettings.settings.apiPath;
    const changedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== "") {
        changedData[key] = value;
      } else {
        changedData[key] = dataPack[currentElement][key];
      }
    }

    const dataForPosting = {
      task: "none",
      filename: props.customSettings.settings.jsonFilename,
      index: currentElement,
      data: changedData,
    };
    axios
      .post(url, dataForPosting)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div ref={exampleRef}>
      <h2>Test Ref</h2>
      <h1>{displayCustomFileName(props.fileName)}</h1>
      {drawForm()}
      <br />
      <Row>
        <Col sm={4}></Col>
        <Col sm={1}>Entry:</Col>
        <Col sm={1}>
          <Form.Control
            as="select"
            value={currentElement}
            disabled={editMode}
            onChange={handleEntrySelect}
          >
            {dataPack.map((value, key) => (
              <option key={key}>{key}</option>
            ))}
          </Form.Control>
        </Col>
        <Col sm={1}>of</Col>
        <Col sm={1}>{dataPack.length - 1}</Col>
      </Row>
      <p className="alert">
        {alertStatus.elementNotInRange
          ? "Element not in range, please enter a correct value..."
          : ""}
      </p>
      <Row>
        <Button onClick={exampleFunction}>Test 2</Button>
      </Row>
      <Row>
        <Button
          onClick={() => {
            handleChange(1);
          }}
        >
          Test 3
        </Button>
      </Row>
    </div>
  );
}
