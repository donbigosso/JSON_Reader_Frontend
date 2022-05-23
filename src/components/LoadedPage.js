import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FormControl, Row } from "react-bootstrap";
export default function LoadedPage(props) {
  const dataPack = props.data;
  const [labelCnt, setLabelCnt] = useState(0);
  const [labelVals, setLabelVals] = useState([]);
  const [currentElement, setCurrentElement] = useState(0);

  const labelCaptions = {
    //customize your labels here: key => your own label
    name: "Motorbike name",
    engine: "Motorbike engine",
    production_date: "Production date",
    price: "Rent price (per day)",
    availability: "Availability",
    pic: "Picture",
    foo: "bar",
    enter: "your",
    labels: "here",
  };

  const fileNames = {
    //customize your file names here here: file name =>  your own name
    "motorbikeList.json": "Edit motorbike properties",
  };
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
  return (
    <div>
      <h1>{displayCustomFileName(props.fileName)}</h1>
      {drawForm()}
      <br />
      Entry {currentElement + 1}/{dataPack.length}:
    </div>
  );
}
