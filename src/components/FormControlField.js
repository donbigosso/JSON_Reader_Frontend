import React, { useState, useEffect } from "react";
import { checkPlaceholder, checkInputType } from "../functions";
import { Form, FormControl } from "react-bootstrap";

export default function FormControlField({
  sendDataToParent,

  ...props
}) {
  //const createAFormControlField = (element, index)
  const [formValue, setFormValue] = useState(props.value);
  const [editMode, setEditMode] = useState(props.editMode);
  // @todo create dynamic form adjustemt (to string number, etc)
  const typeOfInput = checkInputType(props.value);

  const handleChange = (event) => {
    setFormValue(event.target.value);
    // sendDataToParent(formValue, props.formInputID);
  };

  useEffect(() => {
    sendDataToParent(formValue, props.formInputID);
  }, [formValue]);

  useEffect(() => {
    setFormValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setFormValue(props.value);
  }, [props.editMode]);

  useEffect(() => setEditMode(props.editMode), [props.editMode]);

  const drawTextArea = (value) => {
    const len = value.length;
    return len < 80 ? (
      <Form.Control
        className="formField"
        type="text"
        readOnly={!editMode}
        value={checkPlaceholder(formValue)}
        onChange={handleChange}
      />
    ) : (
      <Form.Control
        className="formField"
        as="textarea"
        readOnly={!editMode}
        value={checkPlaceholder(formValue)}
        onChange={handleChange}
      />
    );
  };

  return typeOfInput !== "boolean" && typeOfInput !== "text" ? (
    <Form.Control
      className="formField"
      type={typeOfInput}
      readOnly={!editMode}
      value={checkPlaceholder(formValue)}
      onChange={handleChange}
    />
  ) : typeOfInput === "text" ? (
    drawTextArea(formValue)
  ) : (
    <FormControl
      as="select"
      defaultValue={formValue ? "True" : "False"}
      className="formField"
      disabled={!editMode}
    >
      <option>True</option>
      <option>False</option>
    </FormControl>
  );
}
