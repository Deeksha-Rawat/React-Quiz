// import React, { useState, useEffect } from "react";

// const DisplayNextQuestionAfterInterval = ({ globalquizarray }) => {
//   const [index, setIndex] = useState(0);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     const updateTimerInterval = setInterval(updateTimer, 1000);
//     const nextQuestionTimeout = setTimeout(
//       displayNextQuestionAfterInterval,
//       16000
//     );

//     return () => {
//       clearInterval(updateTimerInterval);
//       clearTimeout(nextQuestionTimeout);
//     };
//   }, [index]);

//   const updateTimer = () => {
//     setTimer((prevTimer) => prevTimer + 1);
//   };

//   const displayNextQuestionAfterInterval = () => {
//     if (index >= globalquizarray.length) {
//       // Handle end of quiz
//       return;
//     }

//     const el = globalquizarray[index];

//     const answers = el.answers.map((elem, index) => (
//       <div
//         key={elem.answer_id}
//         className={`option${index} options`}
//         onClick={() =>
//           handleQuizResponse(`option${index}`, elem.answer_id, el.question_id)
//         }
//       >
//         <p className="answertext">{elem.answer}</p>
//       </div>
//     ));

//     setIndex(index + 1);
//     setTimer(0);

//     return (
//       <div className="afterStart">
//         <div className="ribbon">
//           <p>
//             Question: <span>{index + 1}</span>/3
//           </p>
//         </div>
//         <p className="dymquestion">{el.question}</p>
//         <div className="answerdiv">{answers}</div>
//         <div className="stopwatch">
//           <img src="https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_march_24/zenrik_images/Image-98-17115302636923.png?v=1711530264" />
//           <div>
//             00:<span className="timer">{timer}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return <div>{displayNextQuestionAfterInterval()}</div>;
// };

// export default DisplayNextQuestionAfterInterval;
// DisplayNextQuestionAfterInterval.js
// DisplayNextQuestionAfterInterval.js
import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";

const DisplayNextQuestionAfterInterval = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Move to the next question after 16 seconds
    const timeout = setTimeout(displayNextQuestion, 16000);
    return () => clearTimeout(timeout);
  }, [currentQuestionIndex]);

  const displayNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < quizData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="quiz-container">
      {quizData[currentQuestionIndex] && (
        <QuizQuestion
          question={quizData[currentQuestionIndex].question}
          answers={quizData[currentQuestionIndex].answers}
          questionId={quizData[currentQuestionIndex].question_id}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizData.length}
          displayNextQuestion={displayNextQuestion}
        />
      )}
    </div>
  );
};

export default DisplayNextQuestionAfterInterval;
