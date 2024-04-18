import React, { useState, useEffect } from "react";

const Timer = ({ initialDuration, onTimeout }) => {
  const [countdown, setCountdown] = useState(initialDuration);

  useEffect(() => {
    let timerInterval;

    if (countdown > 0) {
      timerInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
      onTimeout();
    }

    return () => clearInterval(timerInterval);
  }, [countdown, initialDuration, onTimeout]);

  return <>{countdown}</>;
};

export default Timer;
