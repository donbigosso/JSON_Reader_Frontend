import React from "react";

export default function RegExpTester(props) {
  const source = props.children;
  const boldPatternBeg = /<b>/g;

  let splitArr = [];
  let newArr = [];

  const hasBold = (string) => {
    let result = boldPatternBeg.test(string);

    if (result) {
      splitArr = string.split(boldPatternBeg);
      splitArr.forEach((element, index) => {
        const boldPatternEnd = /<\/b>/g;
        let hasEnding = boldPatternEnd.test(element);

        let boldEndPos = element.indexOf("</b>");

        newArr[index] = `${element}:${boldEndPos}:${hasEnding}`;
      });
      //let boldBeg = string.indexOf("<b>");
      //let boldEnd = string.indexOf("</b>");
      //let slicedText = string.slice(boldBeg + 3, boldEnd);
      //return `Bold begins at ${boldBeg} and ends at ${boldEnd}.`;
      //return slicedText;
      console.log(newArr);
      return newArr;
    } else {
      return "no bold";
    }
  };
  return <div>{hasBold(source)}</div>;
}
