import React from "react";
import Timer from "./Timer";
export default function ParentFunctionTester({
  parentFunction,

  ...props
}) {
  const myStyle = {
    width: "300px",
    //height: "90px",
    backgroundColor: "yellow",
    borderRadius: "10px",
    border: "2px solid red",
    lineHeight: "45px",
  };
  const loadedData = props.loadedData;
  return (
    <div style={myStyle}>
      {loadedData[0].name}
      <br />
      <button className="myButton" onClick={parentFunction}>
        Reload data
      </button>
      <Timer key={1} maxRange={60} />
      <Timer key={2} maxRange={300} />
    </div>
  );
}
