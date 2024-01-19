import React, { useState, useEffect } from "react";
import LeaderBoardComponent from "../components/LeaderBoard/LeaderBoardComponent";
import Base from "../layout/Base";
// import scoresData from "../assets/score.json"; //initially using demo data
import apiClient from "../apiClient/apiClient";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { override } from "../App";

function LeaderBoard() {
  const [scoresData, setScoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      let { data } = await apiClient.get(`/quiz/getLeaderboard`);
      if (data.success) {
        setScoresData(data.data);
        // toast.success(data.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Base title="LeaderBoard | Learn Language Game">
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
        scoresData && <LeaderBoardComponent score={scoresData} />
      )}
    </Base>
  );
}

export default LeaderBoard;
