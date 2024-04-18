import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import Reward from "./Reward";
import { userId, remainder } from "../utils/utils";
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
    try {
      const res = {
        data: {
          campaign_id: 5,
          campaign_name: "Live Quiz IPL 2024",
          campaign_type: "quiz",
          content: {
            streaks: [],
            timer: "unlimited",
            quiz: [
              {
                question_id: 16,
                question:
                  "Who was the first highest paid foreign player in the Indian T20 League 2023 auction?",
                answers: [
                  { answer_id: 49, answer: "S Curran" },
                  { answer_id: 50, answer: "P Cummins" },
                ],
              },
              {
                question_id: 17,
                question:
                  "Who was the second highest paid foreign player in the Indian T20 League 2023 auction?",
                answers: [
                  { answer_id: 53, answer: "Sandha" },
                  { answer_id: 54, answer: "meghna" },
                ],
              },
              {
                question_id: 18,
                question:
                  "Who was the third highest paid foreign player in the Indian T20 League 2023 auction?",
                answers: [
                  { answer_id: 55, answer: "ABC" },
                  { answer_id: 56, answer: "XYZ" },
                ],
              },
            ],
            submitted: [],
          },
        },
        status: true,
      };

      if (res.status) {
        setQuizData(res.data.content.quiz);
      }
    } catch (error) {
      console.error("Error fetching quiz data: ", error);
    }
  };

  const displayNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const renderQuiz = () => {
    if (!quizData.length) {
      return <div>Loading...</div>;
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
