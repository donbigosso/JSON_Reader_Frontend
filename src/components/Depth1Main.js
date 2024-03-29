import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import FormControlField from "./FormControlField";
import {
  displayLabelName,
  checkPlaceholder,
  checkInputType,
} from "../functions";

export default function Depth1Main(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [editMode, setEditMode] = useState(false);
  const [childData, setChildData] = useState([]);
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;

  const updateChildDataArray = (data, key) => {
    const tempChildData = { ...childData };
    tempChildData[key] = data;
    setChildData(tempChildData);
    console.log(childData);
  };

  return (
    <div>
      <Container>
        <h2>{displayLabelName("conscious_pl_PL.json", fileNames)}</h2>
        <FormControlField
          formInputID="test"
          value="Bigos"
          editMode={true}
          testFunction={updateChildDataArray}
        />
        <FormControlField
          formInputID="test2"
          value="Marysia"
          editMode={true}
          testFunction={updateChildDataArray}
        />
      </Container>
    </div>
  );
}
