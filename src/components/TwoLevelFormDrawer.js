import React, { useState, useEffect } from "react";
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
  const [selectedEntry, setSelectedEntry] = useState(3);

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

  const newFieldDrawer = (entry) => {
    const newFormKeys = Object.keys(dataPack[entry]);
    return newFormKeys.map((element, index) => (
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
    setSelectedEntry(event.target.value);
    //  console.log(secLevData);
  };

  useEffect(() => {
    console.log(selectedEntry);
    newFieldDrawer(selectedEntry);
  }, [selectedEntry]);

  return (
    <div className="formBackground">
      <Container className="formContainer">
        <h2 className="formHeader">
          {displayLabelName(props.settings.settings.jsonFilename, fileNames)}
        </h2>
        {
          //drawFormFields()

          newFieldDrawer(selectedEntry)
        }
        <Row className="bottomFormRow">
          <Col xs={1}></Col>
          <Col xs={2}>
            <Button>Previous</Button>
          </Col>
          <Col xs={2}>Entry</Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              value={selectedEntry}
              onChange={handleEntrySelection}
            />
          </Col>
          <Col xs={2}>of X </Col>
          <Col xs={2}>
            <Button>Next</Button>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </div>
  );
}
