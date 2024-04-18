import React from "react";
import { userId } from "../utils/utils";
const UIForLessThanThree = () => {
  const correctCount = localStorage.getItem(`correct_count_${userId}`);

  return (
    <>
      <p>
        <span className="questionscompleted">{correctCount}</span>/3 Correct
        Answers!
      </p>
      <p className="rewards" style={{ color: "black", fontWeight: "400" }}>
        Come back tomorrow and answer all 3 question correctly to win and get
        rewards
      </p>
      <div>
        <button
          onClick={() => {
            document.querySelector(".quiz-cont").innerHTML = "";
          }}
        >
          Okay
        </button>
      </div>
    </>
  );
};

export default UIForLessThanThree;
