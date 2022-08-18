import React from "react";

import { Form } from "react-bootstrap";
import { displayLabelName } from "../functions";

export default function FormLabelField(props) {
  const labelCaptions = props.labelCaptions;
  return (
    <>
      <Form.Label>{displayLabelName(props.value, labelCaptions)}</Form.Label>
    </>
  );
}
