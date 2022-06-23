import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import EntryEditor from "./components/EntryEditor";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dataPack, setDataPack] = useState([]);
  const [customSettings, setCustomSettings] = useState({
    settings: {
      jsonFilename: "",
    },
  });

  const jsonFolderPath = customSettings.settings.jsonPath;
  const fileName = customSettings.settings.jsonFilename; //name wil be used as a header for Loaded Page
  const noCache = Math.round(Date.now() / 100);
  const url = `${jsonFolderPath + fileName}?noCache=${noCache}`;
  const settingsFile = `${process.env.PUBLIC_URL}/data/settings.json?noCache=${noCache}`;
  const getDataPack = () => {
    if (customSettings.settings.jsonFilename !== "") {
      axios
        .get(url)
        .then((res) => {
          const imported = res.data;
          setDataPack(imported);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCustomization = () => {
    axios
      .get(settingsFile)
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
  }, [customSettings]); //custom settings must load first to get data

  useEffect(() => {
    getCustomization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decideIfContentExists = () => {
    if (
      typeof dataPack[0] !== "object" ||
      typeof customSettings.labelCaptions !== "object"
    ) {
      return <Loader />;
    } else {
      return (
        <EntryEditor
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
