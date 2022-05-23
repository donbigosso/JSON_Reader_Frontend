import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import LoadedPage from "./components/LoadedPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //put yourt path to folder and file name seperately below
  const jsonFolderPath = process.env.PUBLIC_URL + "/data/";
  const fileName = "motorbikeList.json"; //name wil be used as a header for Loaded Page

  //no need to edit below lines
  const fullPath = jsonFolderPath + fileName;
  const newNoCache = Math.round(Date.now() / 100000);
  const url = `${fullPath}?noCache=${newNoCache}`;
  const [dataPack, setDataPack] = useState([]);
  const getDataPack = () => {
    // fetches data from the chosen language JSON file
    axios
      .get(url)
      .then((res) => {
        const imported = res.data;
        setDataPack(imported);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDataPack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const decideIfContentExists = () => {
    if (typeof dataPack[0] !== "object") {
      return <Loader />;
    } else {
      return <LoadedPage data={dataPack} fileName={fileName} />;
    }
  };

  return <div className="App">{decideIfContentExists()}</div>;
}

export default App;
