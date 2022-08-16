import React, { useState } from "react";
import Depth1Main from "./Depth1Main";
import FlatFormDrawer from "./FlatFormDrawer";
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
  const [childData, setChildData] = useState([]);

  const myStyle = {
    width: "300px",
    //height: "90px",
    backgroundColor: "lightgrey",
    borderRadius: "10px",
    border: "2px solid red",
    lineHeight: "22px",
  };

  const displayModuleDependingonDepth = (depth) => {
    if (depth) {
      switch (depth) {
        case 1:
          return (
            <FlatFormDrawer loadedData={dataPack} settings={props.settings} />
          );
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

  return <div>{displayModuleDependingonDepth(checkObjectDepth(dataPack))}</div>;
}
