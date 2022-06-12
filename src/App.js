import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import LoadedPage from "./components/LoadedPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dataPack, setDataPack] = useState([]);
  const [customSettings, setCustomSettings] = useState([]);
  const jsonFolderPath = process.env.PUBLIC_URL + "/data/";
  const fileName = "zTata.json"; //name wil be used as a header for Loaded Page
  const noCache = Math.round(Date.now() / 100000);
  const url = `${jsonFolderPath + fileName}?noCache=${noCache}`;
  const customizeFile = `${process.env.PUBLIC_URL}/data/customize.json?noCache=${noCache}`;
  console.log(customizeFile);
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

  const getCustomization = () => {
    axios
      .get(customizeFile)
      .then((res) => {
        const imported = res.data;
        setCustomSettings(imported);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDataPack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getCustomization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decideIfContentExists = () => {
    if (typeof dataPack[0] !== "object") {
      return <Loader />;
    } else {
      return (
        <LoadedPage
          data={dataPack}
          fileName={fileName}
          customSettings={customSettings}
        />
      );
    }
  };

  return <div className="App">{decideIfContentExists()}</div>;
}

export default App;
