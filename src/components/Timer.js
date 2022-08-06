import React, { useState, useEffect } from "react";

export default function Timer({ maxRange }) {
  const [counter, setCounter] = useState(maxRange);
  const [timerRunning, setTimerRunning] = useState(true);
  useEffect(() => {
    if (timerRunning) {
      if (counter > 0) {
        let timer = setTimeout(() => setCounter(counter - 1), 1000);
      }
    }
  }, [counter, timerRunning]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setCounter(maxRange);
  };

  return (
    <>
      <h2>Timer: {counter}</h2>
      <button className="myButton" onClick={toggleTimer}>
        Toggle
      </button>
      <button className="myButton" onClick={resetTimer}>
        Reset
      </button>
    </>
  );
}
