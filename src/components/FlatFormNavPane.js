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
  const editSaveButVar = () => {
    return editMode ? "success" : "primary";
  };

  useEffect(() => {
    setEditMode(props.editMode);
  }, [props.editMode]);
  return (
    <Row className="bottomFormRow centerConternt">
      <Col md={4}></Col>
      <Col md={4}>
        <Button variant={editSaveButVar()} onClick={turnOnEdit}>
          {editMode ? "Save" : "Edit"}
        </Button>
        {editMode ? (
          <Button
            variant="danger"
            className="margLeft1em"
            onClick={turnOffEdit}
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
