import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
export default function FlatFormNavPane({
  sendDataToParent,
  turnOnEdit,
  turnOffEdit,
  ...props
}) {
  // const editMode = props.editMode;
  const [editMode, setEditMode] = useState(props.editMode);

  useEffect(() => {
    setEditMode(props.editMode);
  }, [props.editMode]);

  const editSaveButtonFunc = () => {
    if (editMode) {
      turnOffEdit("save");
    } else {
      turnOnEdit();
    }
  };
  return (
    <Row className="bottomFormRow centerContent">
      <Col md={4}></Col>
      <Col md={4}>
        <Button
          variant={editMode ? "success" : "primary"}
          onClick={editSaveButtonFunc}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
        {editMode ? (
          <Button
            variant="danger"
            className="margLeft1em"
            onClick={() => {
              turnOffEdit("cancel");
            }}
          >
            Cancel
          </Button>
        ) : (
          ""
        )}
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}
