import QuizComponent from "../components/Quiz/QuizComponent";
import Appbar from "../components/Appbar/Appbar";
import QuestionBank from "../assets/quizQuestions.json"; //initially using demodata
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import SubTopic from "../components/SubTopic/SubTopic";
import Base from "../layout/Base";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import apiClient from "../apiClient/apiClient";

function Quiz() {
  const { lang, cat } = useParams();
  let currFilter = cat;
  const [seriesQuestions, setSeriesQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(GlobalContext);
  // let lang = "हिन्दी";

  // let filteredData = QuestionBank.filter(function (elem) {
  //   return elem.category === currFilter && elem.language === lang;
  // });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // fetching data from db
        let { data } = await apiClient.get(
          `/quiz/getSeriesQuestions?language=${lang}&category=${cat}`
        );
        if (data.success) {
          toast.success("Submit once your are done.");
          setSeriesQuestions(data.data);
        } else {
          toast.error("Oho! Error Occured.");
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Appbar />
      {seriesQuestions.length > 1 ? (
        // calling quiz component
        <QuizComponent questionData={seriesQuestions} />
      ) : (
        "No Questions Found!"
      )}
    </>
  );
}

export default Quiz;
