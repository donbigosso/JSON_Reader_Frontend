import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import LoadedPage from "./components/LoadedPage";
function App() {
  const jsonFile = process.env.PUBLIC_URL + "/data/motorbikeList.json";
  const newNoCache = Math.round(Date.now() / 100000);
  const url = `${jsonFile}?noCache=${newNoCache}`;
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
      return <LoadedPage data={dataPack} />;
    }
  };

  return <div className="App">{decideIfContentExists()}</div>;
}

export default App;
