import React from "react";
import {
  checkIfObjectsByKeys,
  drawListItemsAccordingToDepth,
} from "../functions";
export default function ArrayElementsParser(props) {
  const dataPack = props.data;
  const firstLevelKeyArray = checkIfObjectsByKeys(dataPack);
  return <> {drawListItemsAccordingToDepth(firstLevelKeyArray)}</>;
}
