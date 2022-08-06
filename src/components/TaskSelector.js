import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import JsonAssesor from "./JsonAssesor";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentFunctionTester from "./ParentFunctionTester";

export default function TaskSelector(props) {
  const [dataPack, setDataPack] = useState(null);
  const [selectedContent, selectContent] = useState(1);

  const [customSettings, setCustomSettings] = useState({
    settings: {
      jsonFilename: "",
    },
  });
  const noCache = Math.round(Date.now() / 100);
  const settingsFile = `${process.env.PUBLIC_URL}/data/test_settings.json?noCache=${noCache}`;
  //const settingsFile = `http://localhost/my/JSON_manager_api/test_settings.json?noCache=${noCache}`;

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
    getCustomization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jsonFolderPath = customSettings.settings.jsonPath;
  const fileName = customSettings.settings.jsonFilename;
  const url = `${jsonFolderPath + fileName}?noCache=${noCache}`;
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
  useEffect(() => {
    getDataPack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customSettings]);
  const displayContent = () => {
    if (dataPack) {
      switch (selectedContent) {
        case 0:
          return (
            <ParentFunctionTester
              loadedData={dataPack}
              parentFunction={() => {
                getCustomization();
              }}
            />
          );
        case 1:
          return (
            <JsonAssesor
              loadedData={dataPack}
              parentFunction={() => {
                getDataPack();
              }}
            />
          );
      }
    } else {
      return <Loader />;
    }
  };

  return <div>{displayContent()}</div>;
}
