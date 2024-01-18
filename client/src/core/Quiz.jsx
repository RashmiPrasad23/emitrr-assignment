import React from "react";
import QuizComponent from "../components/Quiz/QuizComponent";
import Appbar from "../components/Appbar/Appbar";
import QuestionBank from "../assets/quizQuestions.json";

function Quiz() {
  let lang = "हिन्दी";
  let currFilter = "क्रिया";

  let filteredData = QuestionBank.filter(function (elem) {
    return elem.category === currFilter && elem.language === lang;
  });

  return (
    <>
      <Appbar />
      <QuizComponent questionData={filteredData} />
    </>
  );
}

export default Quiz;
