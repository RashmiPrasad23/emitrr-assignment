import React, { useState, useEffect, useContext } from "react";
import SubTopic from "../components/SubTopic/SubTopic";
import Base from "../layout/Base";
import Series from "../assets/quizQuestions.json";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import apiClient from "../apiClient/apiClient";
import ClipLoader from "react-spinners/ClipLoader";
import { override } from "../App";

function TestSeries() {
  // QuestionBank usestate([])
  // context api authUser.languagePref
  // useeffecr
  // apiClient
  // let {data} = apiClient.get(`/quiz/get?q=${authUser.languagePref}`)
  // data.data // setQuestionBank(data.data)
  const [allSeries, setAllSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let { data } = await apiClient.get(`/quiz/getAllSeries`);

        if (data.success) {
          setAllSeries(data.data);
        } else {
          toast.error("Oho! Error Occured.");
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, [authUser]);

  return (
    <Base title="Start a Quiz">
      {loading ? (
        <div className="vw-100 vh-100">
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <SubTopic data={allSeries} />
      )}
    </Base>
  );
}

export default TestSeries;
