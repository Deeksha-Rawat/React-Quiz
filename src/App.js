import "./App.css";
import Banner from "./components/Banner";
import StaticContent from "./components/StaticContent";
import QuizContainer from "./components/QuizContainer";
import React, { useEffect } from "react";
import { getParams, userPageVisitCapture } from "./utils/utils";
function App() {
  useEffect(() => {
    const userId = getParams("userId") || "";

    // userPageVisitCapture("Start-MatchHour-Pagevisits", userId);
    // accordion_custom();
  }, []);

  return (
    <div className="main-wrapper">
      <Banner />
      <QuizContainer />
      <StaticContent />
    </div>
  );
}

export default App;
