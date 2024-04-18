import React from "react";
import Timer from "./Timer";
import { userId, stopWatchImg, campaign_id } from "../utils/utils";
import { useState, useEffect } from "react";

const QuizQuestion = ({
  question,
  answers,
  questionId,
  currentQuestion,
  totalQuestions,
  displayNextQuestion,
}) => {
  const [answered, setAnswered] = useState(false);
  const [timerDuration, setTimerDuration] = useState(6);

  useEffect(() => {
    document.querySelectorAll(".answer-option").forEach((el) => {
      el.classList.remove("right-ans", "wrong-ans");
      el.style.pointerEvents = "auto";
    });
    setAnswered(false);
    setTimerDuration(6);
  }, [questionId]);

  useEffect(() => {
    if (!answered) {
      setTimerDuration(6);
    }
  }, [answered]);
  useEffect(() => {
    if (answered) {
      const timeout = setTimeout(() => {
        displayNextQuestion();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [answered, displayNextQuestion]);

  const handleTimeout = () => {
    if (!answered) {
      displayNextQuestion();
    }
  };

  const handleResponse = async (answerId, questionId, event) => {
    const optionClicked = await insertQuizSelection(questionId, answerId);
    const clickedEvent = event.target;
    const correctOption = optionClicked.data.response_payload[0].is_correct;
    const correctAnswer =
      optionClicked.data.response_payload[0].correct_answer_id;
    document.querySelectorAll(".answer-option").forEach((el) => {
      el.style.pointerEvents = "none";
    });

    if (optionClicked.status) {
      if (correctOption === 1) {
        clickedEvent.classList.add("right-ans");
      } else {
        clickedEvent.classList.add("wrong-ans");
        const correctAnswerElement = document.getElementById(
          "answer" + correctAnswer
        );
        correctAnswerElement.classList.add("right-ans");
      }
    }
    setAnswered(true);
  };

  const insertQuizSelection = async (questionId, answerId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      user_id: userId,
      submission: [
        {
          question_id: questionId,
          answer_id: answerId,
        },
      ],
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    return fetch(
      `https://corvus.howzat.com/v2/platform/1/campaign/${campaign_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem(
          `correct_count_${userId}`,
          result.data.correct_count
        );

        return result;
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="afterStart">
      <div>
        <div className="ribbon">
          <p>
            Question: <span>{currentQuestion}</span>/{totalQuestions}
          </p>
        </div>
        <p className="dymquestion">{question}</p>
        <div className="answerdiv">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`answer-option option${index} `}
              id={`answer${answer.answer_id}`}
              onClick={(event) =>
                handleResponse(answer.answer_id, questionId, event)
              }
            >
              {answer.answer}
            </div>
          ))}
        </div>
        <div className="stopwatch">
          <img src={stopWatchImg} alt="stopwatch" />
          <div>
            00:
            <Timer
              key={questionId}
              initialDuration={timerDuration}
              onTimeout={handleTimeout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
