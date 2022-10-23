import React, { useState } from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
export default function LoginScreen(props) {
  const [credentials, setCredentails] = useState(["", ""]);
  const handleUsername = (e) => {
    let tempCredentials = [...credentials];
    tempCredentials[0] = e.target.value;
    setCredentails(tempCredentials);
  };
  const handlePassword = (e) => {
    let tempCredentials = [...credentials];
    tempCredentials[1] = e.target.value;
    setCredentails(tempCredentials);
  };
  return (
    <div className="loaderBg">
      <Container className="formContainer">
        <Row>
          <h2 className="formHeader">Log in to continue</h2>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Form.Control
              className="formField"
              type="text"
              value={credentials[0]}
              placeholder="Username"
              onChange={handleUsername}
            />
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Form.Control
              className="formField topMargin1em"
              type="password"
              value={credentials[1]}
              placeholder="Password"
              onChange={handlePassword}
            />
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Button className="topMargin1em">Log in</Button>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
  );
}
