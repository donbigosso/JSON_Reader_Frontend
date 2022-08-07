import React, { useState } from "react";
import Depth1Main from "./Depth1Main";
import Depth2Main from "./Depth2Main";
export default function JsonAssesor({
  parentFunction,

  ...props
}) {
  const [dataPack, setDataPack] = useState(props.loadedData[0]);
  const [errors, setErrors] = useState([]);

  const myStyle = {
    width: "300px",
    //height: "90px",
    backgroundColor: "lightgrey",
    borderRadius: "10px",
    border: "2px solid red",
    lineHeight: "22px",
  };

  const verifyIfObject = (object) => {
    if (typeof object === "object") {
      return true;
    } else {
      return false;
    }
  };

  const checkObjectDepth = (object) => {
    let depth = 0;
    if (verifyIfObject(object)) {
      depth = 1;
      if (verifyIfObject(object[0])) {
        depth = 2;
        const level2keys = Object.keys(object[0]);
      }
    }
    return depth;
  };

  const getObject = (value, key, array) => {
    if (verifyIfObject(value)) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfObjectsByKeys = (object) => {
    const keys = Object.keys(object);
    const keyLength = keys.length;

    for (let i = 0; i < keyLength; i++) {
      const keyValue = keys[i];
      console.log(verifyIfObject(object[keyValue]));
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
  checkIfObjectsByKeys(dataPack);
  return (
    <div style={myStyle}>
      {displayModuleDependingonDepth(checkObjectDepth(dataPack))}
    </div>
  );
}
