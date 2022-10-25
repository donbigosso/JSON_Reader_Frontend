import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
export default function FlatFormNavPane({
  sendDataToParent,

  ...props
}) {
  return (
    <Row className="bottomFormRow centerConternt">
      <Col>
        <Button>Save</Button>
      </Col>
      <Col>
        <Button>Cancel</Button>
      </Col>
    </Row>
  );
}
