import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentFunctionTester from "./ParentFunctionTester";

export default function TaskSelector(props) {
  const [dataPack, setDataPack] = useState([]);

  const [customSettings, setCustomSettings] = useState({});
  const noCache = Math.round(Date.now() / 100);
  const settingsFile = `${process.env.PUBLIC_URL}/data/test_settings.json?noCache=${noCache}`;
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

  const displayStringNew = async () => {
    const displayItem = await customSettings.labelCaptions.name;
    if (!displayItem.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return displayItem.json();
    }
  };
  const showSomeContent = () => {
    if (customSettings) {
      return (
        <ParentFunctionTester
          parentFunction={getCustomization}
          string={displayStringNew()}
        />
      );
    } else {
      return <Loader />;
    }
  };
  /*const getDataPack = () => {
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
  }; */

  return <div>{showSomeContent()}</div>;
}
