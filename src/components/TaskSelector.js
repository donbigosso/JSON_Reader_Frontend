import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import JsonAssesor from "./JsonAssesor";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./LoginScreen";
import { getCookie } from "../functions";

export default function TaskSelector(props) {
  const [dataPack, setDataPack] = useState(null);
  const [selectedContent, selectContent] = useState(1);
  useEffect(() => {
    const userData = [
      Number(getCookie("loggedStatus")),
      getCookie("loggedUser"),
    ];

    if (userData[0] == 1) {
      //if user is logged in
      console.log(`Logged user: ${userData[1]}`);
      selectContent(2);
    }
  }, []);
  const [customSettings, setCustomSettings] = useState({
    settings: {
      jsonFilename: "",
    },
  });
  const noCache = Math.round(Date.now() / 100);
  //const settingsFile = `${process.env.PUBLIC_URL}/data/test_settings.json?noCache=${noCache}`;
  //const settingsFile = `http://localhost/my/newApi/test_settings.json?noCache=${noCache}`;
  const settingsFile = `http://consciouswood.com/API/test_settings.json?noCache=${noCache}`;
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
          return <Loader />;
        case 1:
          return <LoginScreen sendAuthConfirm={() => selectContent(2)} />;
        case 2:
          return (
            <JsonAssesor
              settings={customSettings}
              loadedData={dataPack}
              parentFunction={() => {
                getDataPack();
              }}
              logOut={() => selectContent(1)}
            />
          );
      }
    } else {
      return <Loader />;
    }
  };

  return <div>{displayContent()}</div>;
}
