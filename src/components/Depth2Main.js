import React, { useState } from "react";

export default function Depth2Main(props) {
  const [dataPack, setDataPack] = useState(props.loadedData);
  return <div>{dataPack[0].name}</div>;
}
