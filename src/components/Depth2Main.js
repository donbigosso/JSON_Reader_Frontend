import React, { useState } from "react";
import { checkIfObjectsByKeys, analyseDeeperLevValues } from "../functions";
import ArrayElementsParser from "./ArrayElementsParser";
export default function Depth2Main(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  const firstLevObjKeys = checkIfObjectsByKeys(dataPack);
  const secLevKeyObj = analyseDeeperLevValues(dataPack);
  console.log(secLevKeyObj);
  return (
    <div>
      <h2>Depth 2</h2>
      <ArrayElementsParser data={dataPack} />
    </div>
  );
}
