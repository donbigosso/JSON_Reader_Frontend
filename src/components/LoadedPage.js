import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
export default function LoadedPage(props) {
  const dataPack = props.data;
  const [labelCnt, setLabelCnt] = useState(0);
  const [labelVals, setLabelVals] = useState([]);
  const [currentElement, setCurrentElement] = useState(0);
  const labelCaptions = {
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

  const labelCaptionKeys = Object.keys(labelCaptions);
  const labelCaptionValues = Object.values(labelCaptions);

  // checks if a json label has a proper dectription stored in labelCaptions object
  const displayLabelName = (label) => {
    let labelToDisplay = label;
    labelCaptionKeys.forEach((element) => {
      if (element === label) {
        labelToDisplay = labelCaptions[element];
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
      : "text";
  };

  const drawFormFields = () => {
    return labelKeys.map((element, index) => (
      <Form.Group key={element} controlId={element}>
        <Form.Label>{displayLabelName(element)}: </Form.Label>
        <Form.Control
          type={checkInputType(dataPack[0][element])}
          placeholder={checkPlaceholder(dataPack[currentElement][element])}
        />
      </Form.Group>
    ));
  };

  const drawForm = () => {
    return <Form>{drawFormFields()}</Form>;
  };
  return (
    <div>
      {drawForm()}
      <br />
      Entry {currentElement + 1}/{dataPack.length}:
    </div>
  );
}
