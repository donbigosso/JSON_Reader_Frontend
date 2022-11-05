import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import JsonAssesor from "./JsonAssesor";
import ConsciousWoodForm from "./ConsciousWoodForm";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./LoginScreen";
import { getCookie } from "../functions";

export default function TaskSelector(props) {
  const [dataPack, setDataPack] = useState(null);
  const [fileDataPack, setFileDataPack] = useState([]);
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
      PLContent: "",
    },
  });
  const noCache = Math.round(Date.now() / 100);
  //const settingsFile = `${process.env.PUBLIC_URL}/data/test_settings.json?noCache=${noCache}`;
  const settingsFile = `http://localhost/my/newApi/conscious_settings.json?noCache=${noCache}`;
  //const settingsFile = `http://consciouswood.com/API/test_settings.json?noCache=${noCache}`;
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
  const plFile = customSettings.settings.PLContent;
  const enFile = customSettings.settings.ENContent;
  const deFile = customSettings.settings.DEContent;
  const imageFile = customSettings.settings.images;
  const PLurl = `${jsonFolderPath + plFile}?noCache=${noCache}`;
  const ENurl = `${jsonFolderPath + enFile}?noCache=${noCache}`;
  const DEurl = `${jsonFolderPath + deFile}?noCache=${noCache}`;
  const imageUrl = `${jsonFolderPath + imageFile}?noCache=${noCache}`;
  const getDataPack = (url) => {
    if (customSettings.settings.PLContent !== "") {
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

  const getFileDataPack = (url, index) => {
    if (customSettings.settings.PLContent !== "") {
      axios
        .get(url)
        .then((res) => {
          const imported = res.data;
          let tempFileDataPack = [...fileDataPack];
          tempFileDataPack[index] = imported;
          setFileDataPack(tempFileDataPack);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDataPack(PLurl);
    getFileDataPack(PLurl, 1);
  }, [customSettings]);

  useEffect(() => {
    getFileDataPack(ENurl, 2);
  }, [fileDataPack[1]]);

  useEffect(() => {
    getFileDataPack(DEurl, 3);
  }, [fileDataPack[2]]);

  useEffect(() => {
    getFileDataPack(imageUrl, 4);
  }, [fileDataPack[3]]);

  const displayContent = () => {
    if (fileDataPack[4]) {
      //waits until all 4 files are loaded
      switch (selectedContent) {
        case 0:
          return <Loader />;
        case 1:
          return <LoginScreen sendAuthConfirm={() => selectContent(2)} />;
        case 2:
          return (
            <ConsciousWoodForm
              settings={customSettings}
              loadedData={dataPack}
              logOut={() => selectContent(1)}
              fileDataPack={fileDataPack}
            />
          );
      }
    } else {
      return <Loader />;
    }
  };

  return <div>{displayContent()}</div>;
}
