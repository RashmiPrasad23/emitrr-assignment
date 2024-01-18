import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./core/Home";
import Login from "./core/Login";
import Signup from "./core/Signup";
import Quiz from "./core/Quiz";
import LeaderBoard from "./core/LeaderBoard";
import Profile from "./core/Profile";
import Settings from "./core/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faGauge,
  faUser,
  faMoneyCheckDollar,
  faPencil,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "./context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TestSeries from "./core/TestSeries";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  zIndex: "9999",
  backgroundColor: "white",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};
function App() {
  const { authUser, setAuthUser } = useContext(GlobalContext);
  let [loading, setLoading] = useState(false);

  async function refreshAuthState() {
    try {
      let getRefreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/refresh-token`,
        {
          refreshToken:
            getRefreshToken !== undefined && JSON.parse(getRefreshToken),
        },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success) {
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(data.data.refreshToken)
        );
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuthUser({
          fullName: data.data.user.fullName,
          email: data.data.user.email,
          username: data.data.user.username,
          role: data.data.user.role,
          languagePref: data.data.user.languagePref || "english",
        });
      } else {
        setAuthUser({
          fullName: "",
          email: "",
          username: "",
          role: null,
          languagePref: "English",
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    refreshAuthState();
  }, []);

  return (
    <Router>
      {loading && (
        <div className="vw-100 vh-100">
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="profile" element={<Profile />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="start" element={<TestSeries />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
library.add(
  fab,
  faGauge,
  faUser,
  faMoneyCheckDollar,
  faPencil,
  faRightFromBracket
);

export default App;
