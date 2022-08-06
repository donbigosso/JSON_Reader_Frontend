import React, { useState } from "react";
import Depth1Main from "./Depth1Main";
import Depth2Main from "./Depth2Main";
export default function JsonAssesor({
  parentFunction,

  ...props
}) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const [errors, setErrors] = useState("Blah blah");

  const myStyle = {
    width: "300px",
    //height: "90px",
    backgroundColor: "lightgrey",
    borderRadius: "10px",
    border: "2px solid red",
    lineHeight: "22px",
  };

  const verifyIfObject = (object) => {
    try {
      if (typeof object === "object") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const checkObjectDepth = (object) => {
    let depth = 0;
    if (verifyIfObject(object)) {
      depth = 1;
      if (verifyIfObject(object[0])) {
        depth = 2;
      }
    }
    return depth;
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
      return "Error handling to be added";
    }
  };
  return (
    <div style={myStyle}>
      {displayModuleDependingonDepth(checkObjectDepth(dataPack))}
    </div>
  );
}
