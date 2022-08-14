import React, { useState } from "react";
import { checkPlaceholder, checkInputType } from "../functions";
import { Form, FormControl } from "react-bootstrap";

export default function FormControlField(props) {
  //const createAFormControlField = (element, index)
  const [formValue, setFormValue] = useState(props.value);
  const [editMode, setEditMode] = useState(props.editMode);
  // @todo create dynamic form adjustemt (to string number, etc)
  const typeOfInput = checkInputType(props.value);

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  return typeOfInput !== "boolean" ? (
    <Form.Control
      className="formField"
      type={typeOfInput}
      readOnly={!editMode}
      value={checkPlaceholder(formValue)}
      onChange={handleChange}
    />
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
