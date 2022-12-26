import React, { useState } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import { setCookie } from "../functions";
import axios from "axios";

export default function FileUploader({ logOut, ...props }) {
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const url = "http://localhost/my/newAPI/test_upload.php";
  const handleSubmit = () => {
    if (file !== "") {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      axios.post(url, formData).then((res) => {
        console.log(res.data);
      });
    } else {
      console.log("No file uploaded...");
    }
  };
  return (
    <div className="formBackground">
      <Container className="formContainer">
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <div
              className="logOutDiv"
              onClick={() => {
                logOut();
                setCookie("loggedUser", "");
                setCookie("loggedStatus", "");
              }}
            >
              Log out &#8594;
            </div>
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>JSON Manager file uploader</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
        </Row>
        <Row>
          <Button onClick={handleSubmit}>Submit file</Button>
        </Row>
      </Container>
    </div>
  );
}
