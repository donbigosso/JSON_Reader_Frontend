import React, { useState, useEffect } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";
import MyModal from "./MyModal";
import TwoLeVFormNavPane from "./TwoLeVFormNavPane";

import { displayLabelName, writeDataToFile, getCookie } from "../functions";

export default function TwoLevelFormDrawer(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [editMode, setEditMode] = useState(true);
  const [childData, setChildData] = useState(props.loadedData);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;
  const [selectedEntry, setSelectedEntry] = useState(1);

  const [errorMessage, setErrorMsg] = useState("");

  const [modalData, setModalData] = useState({
    show: false,
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

  useEffect(() => {
    const entryCookie = getCookie("selectedEntry");
    if (entryCookie !== "") {
      setSelectedEntry(Number(entryCookie));
    }
  }, []);

  const setEntryFromInput = (value) => {
    setSelectedEntry(value);
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

        <Row>
          <Col xs={4}></Col>

          <Col xs={4}>
            <span className="errorSpan">{errorMessage}</span>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <TwoLeVFormNavPane
          selectedEntry={selectedEntry}
          entryAmount={entryAmount}
          sendDataToParent={setEntryFromInput}
          editMode={editMode}
        />
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
        className="myModal"
        header={modalData.header}
        content={modalData.content}
        buttnos={modalData.buttons}
        sucButText={modalData.btnOne}
        donButText={modalData.btnTwo}
        show={modalData.show}
        onHide={() => setModalData({ ...modalData, show: false })}
        modalAction1={modalData.modalAction1}
        modalAction2={modalData.modalAction2}
      />
    </div>
  );
}
