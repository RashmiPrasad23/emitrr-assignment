import React, { useState, useRef } from "react";
import SingleQuestion from "./SingleQuestion";
import { toast } from "react-toastify";
import apiClient from "../../apiClient/apiClient";
import { useNavigate } from "react-router-dom";

function QuizComponent({ questionData }) {
  const [quesCounter, setQuesCounter] = useState(0); //initial difficulty, desc according to wrong answer
  const [difficultyLvl, setDifficultyLvl] = useState(5);
  const [selectedAnswerForGrading, setSelectedAnswerForGrading] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleNextQuestion = async () => {
    try {
      const answeredQuestionIds = selectedAnswerForGrading.map(
        (answeredQuestion) => answeredQuestion.question._id
      );
      let answerObj = {};
      if (quesCounter !== -1) {
        answerObj = {
          _id: questionData[quesCounter]._id,
          question: questionData[quesCounter].question,
          correctAnswer: questionData[quesCounter].correctAnswer,
          choosenAnswer: selectedOption,
          result: null,
          options: questionData[quesCounter].options,
          difficulty: questionData[quesCounter].difficulty,
          marks: 0,
        };

        console.log("Before calculation - difficultyLvl:", difficultyLvl);
        const nextDifficulty =
          answerObj.correctAnswer === answerObj.choosenAnswer
            ? Math.min(difficultyLvl + 1, 5)
            : Math.max(difficultyLvl - 1, 0);
        console.log("After calculation - nextDifficulty:", nextDifficulty);

        // Find the next question excluding the answered questions
        const foundQuestion = questionData.findIndex(
          (singleQuestion, index) =>
            singleQuestion.difficulty >= nextDifficulty &&
            index > quesCounter &&
            !answeredQuestionIds.includes(singleQuestion._id)
        );

        if (answerObj.correctAnswer === answerObj.choosenAnswer) {
          answerObj.result = "correct";
          answerObj.marks = questionData[quesCounter].difficulty;
          toast.success("Correct answer");

          // Set the quesCounter to the index of the next question
          setQuesCounter(foundQuestion);

          // Update the difficulty level
          setDifficultyLvl(nextDifficulty);
        } else {
          // Set the quesCounter to the index of the next question
          setQuesCounter(foundQuestion);

          setDifficultyLvl(nextDifficulty);

          answerObj.result = "incorrect";
          answerObj.marks = 0;
          toast.error("Incorrect answer! Difficulty level decrease.");
        }
      }
      // push answer object to the useState stack
      if (
        selectedAnswerForGrading.length === 4 ||
        questionData.length - 1 === quesCounter ||
        quesCounter === -1
      ) {
        toast.success("Submitted for grading.");
        // selectedAnswerForGrading
        let { data } = await apiClient.post(`/quiz/postQuizSubmission`, {
          language: questionData[0].language,
          category: questionData[0].category,
          data: [...selectedAnswerForGrading, answerObj],
        });
        if (data.success) {
          setQuesCounter(0);
          setSelectedAnswerForGrading([]);
          navigate("/profile");
        }
      } else {
        setSelectedAnswerForGrading([...selectedAnswerForGrading, answerObj]);
      }
    } catch (e) {
      console.log(quesCounter, selectedAnswerForGrading.length);
      console.log(e, "e");
    }
  };

  const handleOptionChange = (e) => {
    console.log(e);
    setSelectedOption(e);
  };

  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <h3 className="p-4 d-flex justify-content-center w-100">
          Quiz - {`${questionData[0].category}`}
        </h3>

        {questionData[quesCounter] && questionData[quesCounter].question && (
          <SingleQuestion
            question={{
              ...questionData[quesCounter],
              difficulty: difficultyLvl, // Use the updated difficultyLvl
            }}
            index={quesCounter}
            onChange={handleOptionChange}
          />
        )}
        <button
          onClick={handleNextQuestion}
          className={`btn my-3 ${
            selectedAnswerForGrading.length === 4 ? "btn-danger" : "btn-primary"
          }`}
        >
          {selectedAnswerForGrading.length === 4 ? "Submit" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuizComponent;
