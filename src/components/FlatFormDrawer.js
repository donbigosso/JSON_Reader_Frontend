import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";
import FlatFormNavPane from "./FlatFormNavPane";

import { displayLabelName, writeDataToFile } from "../functions";

export default function FlatFormDrawer(props) {
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
      console.log(dataPack);
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
        <h2 className="formHeader">
          {displayLabelName("conscious_pl_PL.json", fileNames)}
        </h2>

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
