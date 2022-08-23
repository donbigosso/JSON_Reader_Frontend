import React, { useState } from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";

import { displayLabelName } from "../functions";

export default function TwoLevelFormDrawer(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [editMode, setEditMode] = useState(true);
  const [childData, setChildData] = useState(props.loadedData);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;
  const [selectedEntry, setSelectedEntry] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  const entryAmount = dataPack.length;
  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[key] = data;
    setChildData(tempChildData);
  };
  let secLevData = dataPack[selectedEntry];
  const formKeys = Object.keys(secLevData);
  //console.log(childData); //-------------------------------------CONSOLE LOG! ----------------------------------------------
  const drawFormFields = () => {
    return formKeys.map((element, index) => (
      <div key={index}>
        <FormLabelField value={element} labelCaptions={labelCaptions} />
        <FormControlField
          formInputID={element}
          value={secLevData[element]}
          editMode={editMode}
          testFunction={updateChildDataArray}
        />
      </div>
    ));
  };

  const handleEntrySelection = (event) => {
    const typedValueIsNumber = Number(event.target.value);
    if (typedValueIsNumber) {
      if (typedValueIsNumber > 0 && typedValueIsNumber <= entryAmount) {
        setSelectedEntry(typedValueIsNumber - 1);
      }
    }
  };

  const increaseCounter = () => {
    if (selectedEntry < entryAmount - 1) {
      const newCounter = selectedEntry + 1;
      setSelectedEntry(newCounter);
    }
  };

  const decreaseCounter = () => {
    if (selectedEntry > 0) {
      const newCounter = selectedEntry - 1;
      setSelectedEntry(newCounter);
    }
  };

  return (
    <div className="formBackground">
      <Container className="formContainer">
        <h2 className="formHeader">
          {displayLabelName(props.settings.settings.jsonFilename, fileNames)}
        </h2>
        {
          drawFormFields()
          // newFieldDrawer(selectedEntry)
        }

        <Row className="bottomFormRow">
          <Col xs={1}></Col>
          <Col xs={2}>
            <Button onClick={decreaseCounter}>Previous</Button>
          </Col>
          <Col xs={2}>Entry</Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              value={selectedEntry + 1}
              onChange={handleEntrySelection}
            />
          </Col>
          <Col xs={2}>of {entryAmount}</Col>
          <Col xs={2}>
            <Button onClick={increaseCounter}>Next</Button>
          </Col>
          <Col xs={1}></Col>
        </Row>
        <Row>
          <Col xs={4}></Col>

          <Col xs={4}>
            <span className="errorSpan">{errorMessage}</span>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
    </div>
  );
}
