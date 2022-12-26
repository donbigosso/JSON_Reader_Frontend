import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import JsonAssesor from "./JsonAssesor";
import FileUploader from "./FileUploader";
import MultipleFlatJSONForm from "./MultipleFlatJSONForm";
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
      selectContent(4); // toDo - set a cookie fir a type of page, now is manual
    }
  }, []);
  const [customSettings, setCustomSettings] = useState({
    settings: {
      flat_content_01: "",
    },
  });
  const noCache = Math.round(Date.now() / 100);
  //const settingsFile = `${process.env.PUBLIC_URL}/data/test_settings.json?noCache=${noCache}`;
  const settingsFile = `http://localhost/my/newApi/settings.json?noCache=${noCache}`;

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
  const file01 = customSettings.settings.flat_content_01;
  const file02 = customSettings.settings.flat_content_02;
  const file03 = customSettings.settings.flat_content_03;
  const imageFile = customSettings.settings.images;
  const content01url = `${jsonFolderPath + file01}?noCache=${noCache}`;
  const content02url = `${jsonFolderPath + file02}?noCache=${noCache}`;
  const content03url = `${jsonFolderPath + file03}?noCache=${noCache}`;
  const imageUrl = `${jsonFolderPath + imageFile}?noCache=${noCache}`;
  const getDataPack = (url) => {
    if (customSettings.settings.flat_content_01 !== "") {
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
    if (customSettings.settings.flat_content_01 !== "") {
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
    getDataPack(content01url);
    getFileDataPack(content01url, 1);
  }, [customSettings]);

  useEffect(() => {
    getFileDataPack(content02url, 2);
  }, [fileDataPack[1]]);

  useEffect(() => {
    getFileDataPack(content03url, 3);
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
          return <LoginScreen sendAuthConfirm={() => selectContent(4)} />; //here too choosse what should be loaded after succesful login
        case 2:
          return (
            <MultipleFlatJSONForm
              settings={customSettings}
              loadedData={dataPack}
              logOut={() => selectContent(1)}
              fileDataPack={fileDataPack}
            />
          );

        case 3:
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

        case 4:
          return <FileUploader logOut={() => selectContent(1)} />;
      }
    } else {
      return <Loader />;
    }
  };

  return <div>{displayContent()}</div>;
}
