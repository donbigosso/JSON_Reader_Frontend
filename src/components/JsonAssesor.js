import React, { useState } from "react";
import ConsciousWoodForm from "./ConsciousWoodForm";
import FlatFormDrawer from "./FlatFormDrawer";

import TwoLevelFormDrawer from "./TwoLevelFormDrawer";
import { checkObjectDepth } from "../functions";
export default function JsonAssesor({ parentFunction, logOut, ...props }) {
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

  const displayModuleDependingonDepth = (depth) => {
    if (depth) {
      switch (depth) {
        case 1:
          return (
            <FlatFormDrawer
              loadedData={dataPack}
              settings={props.settings}
              logOut={logOut}
            />
          );
        case 2:
          return (
            <TwoLevelFormDrawer
              loadedData={dataPack}
              settings={props.settings}
            />
          );
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
