import React, { useState, useEffect } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
export default function ConsciousContentSelector({ secectContent, ...props }) {
  const [selectedOption, setSelectedOption] = useState(1); // 1-content PL 2-content en 3-content DE 4-images 5-settings
  const menuOptions = [
    "blank",
    "Page content PL",
    "Page content EN",
    "Page content DE",
    "Images",
    "Settings",
  ];
  const handleChange = (event) => {
    const selectedFormOption = event.target.value;
    switch (selectedFormOption) {
      case menuOptions[1]:
        setSelectedOption(1);
        break;
      case menuOptions[2]:
        setSelectedOption(2);
        break;
      case menuOptions[3]:
        setSelectedOption(3);
        break;
      case menuOptions[4]:
        setSelectedOption(4);
        break;
      case menuOptions[5]:
        setSelectedOption(5);
        break;
    }
  };
  return (
    <>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <span className="blueColor">Select content to edit below</span>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row>
        <Col sm={5}></Col>
        <Col sm={2}>
          <FormControl
            as="select"
            defaultValue={"Page content PL"}
            className="formField topMargin1em"
            disabled={props.editMode}
            onChange={handleChange}
          >
            <option>{menuOptions[1]}</option>
            <option>{menuOptions[2]}</option>
            <option>{menuOptions[3]}</option>
            <option>{menuOptions[4]}</option>
            <option>{menuOptions[5]}</option>
          </FormControl>
        </Col>
        <Col sm={5}></Col>
      </Row>
    </>
  );
}
