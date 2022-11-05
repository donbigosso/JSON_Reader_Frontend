import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";
import FlatFormNavPane from "./FlatFormNavPane";
import ConsciousContentSelector from "./ConsciousContentSelector";

import { displayLabelName, writeDataToFile, setCookie } from "../functions";

// AiOutlineLogout
export default function ConsciousWoodForm({ logOut, ...props }) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [fileDataPack, setFileDataPack] = useState(props.fileDataPack);
  const [editMode, setEditMode] = useState(false);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;
  const [tempData, setTempData] = useState("");
  const [selectedContent, setSelectedContent] = useState(1);
  const [childData, setChildData] = useState(fileDataPack[selectedContent]);
  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[key] = data;
    setChildData(tempChildData);
  };

  const turnOnEdit = () => {
    setEditMode(true);
    setTempData(fileDataPack[selectedContent]);
  };
  const fileIDs = ["", "PLContent", "ENContent", "DEContent", "images"];

  const turnOffEdit = (reason) => {
    if (tempData !== "" && reason === "cancel") {
      setChildData(fileDataPack[selectedContent]);
      setEditMode(false);
    }
    if (reason === "save") {
      setEditMode(false);

      let tempFileDataPack = [...fileDataPack];
      tempFileDataPack[selectedContent] = childData;
      setFileDataPack(tempFileDataPack);
      writeDataToFile(
        childData,
        props.settings.settings.apiPath,
        props.settings.settings[fileIDs[selectedContent]]
      );
    }
  };
  const returnSelCont = (option) => {
    //console.log("Option selected: " + option);
    setSelectedContent(option);
    setChildData(fileDataPack[option]);
  };
  const formKeys = Object.keys(fileDataPack[selectedContent]);
  //console.log(childData); //-------------------------------------CONSOLE LOG! ----------------------------------------------
  const drawFormFields = () => {
    return formKeys.map((element, index) => (
      <div key={index}>
        <FormLabelField value={element} labelCaptions={labelCaptions} />
        <FormControlField
          formInputID={element}
          value={fileDataPack[selectedContent][element]}
          editMode={editMode}
          sendDataToParent={updateChildDataArray}
        />
      </div>
    ));
  };

  const testFunction = () => {
    console.log(childData);
  };

  return (
    <div className="formBackground">
      <Container className="formContainer">
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <div
              className="logOutDiv"
              onClick={() => {
                logOut();
                setCookie("loggedUser", "");
                setCookie("loggedStatus", "");
              }}
            >
              Log out &#8594;
            </div>
          </Col>
        </Row>
        <Row>
          <h2 className="formHeader">
            {displayLabelName("conscious_pl_PL.json", fileNames)}
          </h2>
        </Row>
        <ConsciousContentSelector
          editMode={editMode}
          selectContent={returnSelCont}
        />
        {drawFormFields()}
        <FlatFormNavPane
          editMode={editMode}
          turnOffEdit={turnOffEdit}
          turnOnEdit={turnOnEdit}
        />
        <button onClick={testFunction}>test</button>
      </Container>
    </div>
  );
}
