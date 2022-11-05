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
  const [editMode, setEditMode] = useState(false);
  const [childData, setChildData] = useState(props.loadedData);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;
  const [tempData, setTempData] = useState("");

  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[key] = data;
    setChildData(tempChildData);
  };

  const turnOnEdit = () => {
    setEditMode(true);
    setTempData(dataPack);
  };

  const turnOffEdit = (reason) => {
    if (tempData !== "" && reason === "cancel") {
      setChildData(dataPack);
      setEditMode(false);
    }
    if (reason === "save") {
      setEditMode(false);

      setDataPack(childData);
      writeDataToFile(
        childData,
        props.settings.settings.apiPath,
        props.settings.settings.jsonFilename
      );
    }
  };

  const formKeys = Object.keys(dataPack);
  //console.log(childData); //-------------------------------------CONSOLE LOG! ----------------------------------------------
  const drawFormFields = () => {
    return formKeys.map((element, index) => (
      <div key={index}>
        <FormLabelField value={element} labelCaptions={labelCaptions} />
        <FormControlField
          formInputID={element}
          value={dataPack[element]}
          editMode={editMode}
          sendDataToParent={updateChildDataArray}
        />
      </div>
    ));
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
        <ConsciousContentSelector editMode={editMode} />
        {drawFormFields()}
        <FlatFormNavPane
          editMode={editMode}
          turnOffEdit={turnOffEdit}
          turnOnEdit={turnOnEdit}
        />
      </Container>
    </div>
  );
}
