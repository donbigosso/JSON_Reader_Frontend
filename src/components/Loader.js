import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import GridLoader from "react-spinners/GridLoader";
export default function Loader() {
  return (
    <div>
      <GridLoader color="red" loading={true} />
    </div>
  );
}
