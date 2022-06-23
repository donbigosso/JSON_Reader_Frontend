import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button, FormControl, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function EntryEditor(props) {
  //TakNieModal({naglowek, tresc, usuwanie, ...props})
  const { register, handleSubmit } = useForm();

  const [editMode, setEditMode] = useState(false);
  const [currentElement, setCurrentElement] = useState(0);
  const [alertStatus, setAlertStatus] = useState({ elementNotInRange: false });
  const labelCaptions = props.customSettings.labelCaptions;
  const fileNames = props.customSettings.fileNames;
  const fileNameKeys = Object.keys(fileNames);
  const dataPack = props.data;

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
        placeholder={checkPlaceholder(dataPack[currentElement][element])}
        {...register(element)}
      />
    ) : (
      <FormControl
        as="select"
        defaultValue={dataPack[currentElement][element] ? "YES" : "NO"}
        className="formField"
        {...register(element)}
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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

  const handleEntrySelector = (event) => {
    const entryValue = parseInt(event.target.value);
    if (entryValue >= 1 && entryValue <= dataPack.length) {
      setAlertStatus({ ...alertStatus, elementNotInRange: false });
      setCurrentElement(entryValue - 1);
    } else if (entryValue < 1) {
      setAlertStatus({ ...alertStatus, elementNotInRange: true });
      setCurrentElement(0);
    } else if (entryValue > dataPack.length) {
      setCurrentElement(dataPack.length - 1);
      setAlertStatus({ ...alertStatus, elementNotInRange: true });
    }
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
    console.log({ ...register("name") });
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
    <div>
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
    </div>
  );
}
