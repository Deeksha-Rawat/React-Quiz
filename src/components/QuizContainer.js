import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import Reward from "./Reward";
import { userId, remainder, campaign_id } from "../utils/utils";
import NotEligibleMessage from "./NotEligibleMessage";
const QuizContainer = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const correct_count = localStorage.getItem(`correct_count_${userId}`);

  useEffect(() => {
    getDataFromApi();
  }, []);

  useEffect(() => {
    const savedCorrectCount = localStorage.getItem(`correct_count_${userId}`);

    if (savedCorrectCount !== null && savedCorrectCount !== "") {
      if (quizData.length > 0) {
        setCurrentIndex(quizData.length);
      }
    }
  }, [quizData]);

  const getDataFromApi = async () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let url = `https://corvus.howzat.com/v2/platform/1/campaign/${campaign_id}?user_id=${userId}`;
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == false) {
          <NotEligibleMessage />;
        } else {
          if (res.data.content.quiz.length === 0) {
            const eligible = document.querySelector(".eligible");
            eligible.innerHTML =
              "<p style='color:white;text-align:center'>Quiz will be active soon</p>";
            eligible.style.minHeight = "72vh";
          }

          // correct_count = localStorage.getItem(`correct_count_${userId}`);
          // let lengthofsubmited = res.data.content.submitted.length;
          // if (lengthofsubmited > 0) {
          //   for (let i = 0; i < lengthofsubmited; i++) {
          //     correctanswerfromAPI += res.data.content.submitted[i].is_correct;
          //   }
          // }

          if (res.status) {
            setQuizData(res.data.content.quiz);
          }
          return res;
        }
      })
      .catch((error) => console.log("error", error));
  };

  const displayNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const renderQuiz = () => {
    if (!quizData.length) {
      return (
        <div>
          <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
        </div>
      );
    }
    if (remainder === 15 || remainder === 16) {
      return (
        <div className="quiz-cont">
          <NotEligibleMessage />
        </div>
      );
    }

    if (currentIndex >= quizData.length) {
      return (
        <div className="quiz-cont">
          <Reward correctCount={correct_count} />
        </div>
      );
    }

    const currentQuestion = quizData[currentIndex];

    return (
      <div className="quiz-cont">
        <QuizQuestion
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          currentQuestion={currentIndex + 1}
          totalQuestions={quizData.length}
          displayNextQuestion={displayNextQuestion}
          questionId={currentQuestion.question_id}
        />
      </div>
    );
  };

  return renderQuiz();
};

export default QuizContainer;
