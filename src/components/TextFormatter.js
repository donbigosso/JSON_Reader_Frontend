import React from "react";

export default function TextFormatter(props) {
  const source = props.children;
  const boldPatternBeg = /<b>/g;
  const dupa = [["kup ", "srajda "], "mocz", "sik"];

  let splitArr = [];
  let newArr = [];
  const printElement = (element, index) => {
    if (typeof element === "object") {
      return (
        <span key={index}>
          <b>{element[0]}</b>
          {element[1]}
        </span>
      );
    } else return element;
  };
  const hasBold = (string) => {
    let result = boldPatternBeg.test(string);

    if (result) {
      splitArr = string.split(boldPatternBeg);
      splitArr.forEach((element, index) => {
        const boldPatternEnd = /<\/b>/g;
        let hasEnding = boldPatternEnd.test(element);
        if (hasEnding) {
          newArr[index] = element.split(boldPatternEnd);
        } else {
          newArr[index] = [];
          newArr[index][0] = element;
          newArr[index][1] = "";
        }
      });

      console.log(newArr);
    } else {
      newArr = [string];
    }
  };
  hasBold(source);
  return (
    <div>
      {
        //hasBold(source)
        newArr.map(printElement)
      }
    </div>
  );
}
