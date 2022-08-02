import React from "react";
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
  return (
    <div style={myStyle}>
      {props.string}
      <br />
      <button className="myButton" onClick={parentFunction}>
        Reload data
      </button>
    </div>
  );
}
