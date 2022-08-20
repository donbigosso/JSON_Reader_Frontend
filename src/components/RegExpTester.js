import React from "react";

export default function RegExpTester(props) {
  const source = props.children;
  const boldPattern = /<b>/;

  const hasBold = (string) => {
    let result = boldPattern.test(string);
    if (result) {
      let boldBeg = string.indexOf("<b>");
      let boldEnd = string.indexOf("</b>");
      let slicedText = string.slice(boldBeg + 3, boldEnd);
      //return `Bold begins at ${boldBeg} and ends at ${boldEnd}.`;
      return slicedText;
    } else {
      return "no bold";
    }
  };
  return <div>{hasBold(source)}</div>;
}
