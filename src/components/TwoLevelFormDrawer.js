import React, { useState, useEffect } from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";
import MyModal from "./MyModal";

import {
  displayLabelName,
  writeDataToFile,
  butVisib,
  setCookie,
  getCookie,
} from "../functions";

export default function TwoLevelFormDrawer(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [editMode, setEditMode] = useState(false);
  const [childData, setChildData] = useState(props.loadedData);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;
  const [selectedEntry, setSelectedEntry] = useState(5);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  const [modalData, setModalData] = useState({
    show: true,
    buttons: 2,
    header: "Test header",
    content: "Test body",
    btnOne: "Continue",
    btnTwo: "Cancel",
    modalAction1: () => setModalData({ ...modalData, show: false }),
    modalAction2: () => setModalData({ ...modalData, show: false }),
  });

  const entryAmount = dataPack.length;
  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[selectedEntry][key] = data;
    setChildData(tempChildData);
  };
  let secLevData = dataPack[selectedEntry];
  const formKeys = Object.keys(secLevData);
  // console.log(childData); //-------------------------------------CONSOLE LOG! ----------------------------------------------
  const drawFormFields = () => {
    return formKeys.map((element, index) => (
      <div key={index}>
        <FormLabelField value={element} labelCaptions={labelCaptions} />
        <FormControlField
          formInputID={element}
          value={secLevData[element]}
          editMode={editMode}
          sendDataToParent={updateChildDataArray}
        />
      </div>
    ));
  };

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
            <Button
              onClick={decreaseCounter}
              disabled={butVisib(
                editMode,
                selectedEntry,
                entryAmount,
                "previous"
              )}
            >
              Previous
            </Button>
          </Col>
          <Col xs={2}>Entry</Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              readOnly={editMode}
              value={selectedEntry + 1}
              onChange={handleEntrySelection}
            />
          </Col>
          <Col xs={2}>of {entryAmount}</Col>
          <Col xs={2}>
            <Button
              disabled={butVisib(editMode, selectedEntry, entryAmount, "next")}
              onClick={increaseCounter}
            >
              Next
            </Button>
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
        <Row>
          <Col xs={4}></Col>

          <Col xs={4}>
            <Button
              onClick={() => {
                setDataPack(childData);
                writeDataToFile(
                  childData,
                  props.settings.settings.apiPath,
                  props.settings.settings.jsonFilename
                );
              }}
            >
              Send Data
            </Button>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
      <MyModal
        header={modalData.header}
        content={modalData.content}
        buttnos={modalData.buttons}
        sucButText={modalData.btnOne}
        danButText={modalData.btnTwo}
        show={modalData.show}
        onHide={() => setModalData({ ...modalData, show: false })}
        modalAction1={modalData.modalAction1}
        modalAction2={modalData.modalAction2}
      />
    </div>
  );
}
