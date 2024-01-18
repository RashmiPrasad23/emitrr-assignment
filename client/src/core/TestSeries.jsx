import React from "react";
import SubTopic from "../components/SubTopic/SubTopic";
import Base from "../layout/Base";
import QuestionBank from "../assets/quizQuestions.json";

function TestSeries() {
  return (
    <Base title="Start a Quiz">
      <SubTopic data={QuestionBank} />
    </Base>
  );
}

export default TestSeries;
