import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import FormControlField from "./FormControlField";
import FormLabelField from "./FormLabelField";
import {
  displayLabelName,
  checkPlaceholder,
  checkInputType,
} from "../functions";

export default function FlatFormDrawer(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [editMode, setEditMode] = useState(false);
  const [childData, setChildData] = useState(props.loadedData);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;

  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[key] = data;
    setChildData(tempChildData);
  };

  const formKeys = Object.keys(dataPack);
  console.log(childData); //-------------------------------------CONSOLE LOG! ----------------------------------------------
  const drawFormFields = () => {
    return formKeys.map((element, index) => (
      <FormControlField
        key={index}
        formInputID={element}
        value={dataPack[element]}
        editMode={true}
        testFunction={updateChildDataArray}
      />
    ));
  };

  return (
    <div>
      <Container>
        <h2>{displayLabelName("conscious_pl_PL.json", fileNames)}</h2>
        <FormLabelField value="home_header" labelCaptions={labelCaptions} />
        {drawFormFields()}
      </Container>
    </div>
  );
}
