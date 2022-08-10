import React, { useState } from "react";
import Depth1Main from "./Depth1Main";
import Depth2Main from "./Depth2Main";
import {
  verifyIfObject,
  checkIfObjectsByKeys,
  checkObjectDepth,
  drawListItemsAccordingToDepth,
} from "../functions";
export default function JsonAssesor({
  parentFunction,

  ...props
}) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [errors, setErrors] = useState([]);

  const myStyle = {
    width: "300px",
    //height: "90px",
    backgroundColor: "lightgrey",
    borderRadius: "10px",
    border: "2px solid red",
    lineHeight: "22px",
  };

  const getObject = (value, key, array) => {
    if (verifyIfObject(value)) {
      return true;
    } else {
      return false;
    }
  };

  const displayModuleDependingonDepth = (depth) => {
    if (depth) {
      switch (depth) {
        case 1:
          return <Depth1Main loadedData={dataPack} />;
        case 2:
          return <Depth2Main loadedData={dataPack} />;
      }
    } else {
      let tempErrors = [...errors];
      const errMsg = "Either not an object or depth not suppported";
      tempErrors.push(errMsg);
      //setErrors(tempErrors);
      console.log(tempErrors);
      return "Either not an object or depth not suppported";
    }
  };

  return (
    <div style={myStyle}>
      {displayModuleDependingonDepth(checkObjectDepth(dataPack))}
    </div>
  );
}
