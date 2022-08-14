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
  const labelCaptions = props.settings.labelCaptions;
  const fileNames = props.settings.fileNames;

  return (
    <div>
      <Container>
        <h2>{displayLabelName("conscious_pl_PL.json", fileNames)}</h2>
        <FormControlField value={true} editMode={true} />
      </Container>
    </div>
  );
}
