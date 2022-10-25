import React, { useState, useEffect } from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
export default function LoginScreen({ sendAuthConfirm, ...props }) {
  const APIpath = `http://localhost/my/newApi/auth_test.php`; //path to auth api
  const [credentials, setCredentails] = useState(["", ""]);
  const [message, setMessage] = useState("");
  const [authRes, setAuthRes] = useState("");
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

  const sendCredsToAPI = () => {
    axios
      .post(APIpath, credentials)
      .then((res) => {
        setAuthRes(res.data[0]);
        if (res.data[0] === false) {
          setMessage(res.data[1]); //if auth response is negative (false) showiin the error message (1. element of response)
        } else {
          setMessage("");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (authRes === true) {
      sendAuthConfirm();
    }
  }, [authRes]);

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
            <span className="errorText">{message}</span>
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Button className="topMargin1em" onClick={sendCredsToAPI}>
              Log in
            </Button>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
  );
}
