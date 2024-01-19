import React, { useContext, useRef, useEffect, useState } from "react";
import Base from "../layout/Base";
import { IoMdRefresh } from "react-icons/io";
import { GlobalContext } from "../context/GlobalContext";
import apiClient from "../apiClient/apiClient";
import { toast } from "react-toastify";
import Chart from "../components/Chart";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const prefRef = useRef();
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(GlobalContext);
  const [chartData, setChartData] = useState([]);
  async function fetchData() {
    let { data } = await apiClient.get(`/users/getSeriesChart`);
    setChartData(data.data);
  }
  useEffect(() => {
    fetchData();
    prefRef.current.value = authUser.languagePref;
  }, [authUser]);

  const handleUpdateLangPref = async () => {
    let { data } = await apiClient.patch(`/users/update-preference`, {
      languagePref: prefRef.current.value,
    });
    if (data.success) {
      setAuthUser({
        ...authUser,
        languagePref: prefRef.current.value,
      });
      toast.success(data.message);
    }
  };

  const handleResetProgress = async () => {
    //

    let { data } = await apiClient.patch(`/users/patchResetProgress`);
    if (data.success) {
      toast.success(data.message);
      fetchData();
    }
  };
  return (
    <Base title="profile">
      <h3 className="p-2 shadow-sm mb-5">Profile</h3>
      <h5 className="p-2 text-capitalize">
        Welcome{" "}
        <span className="p-1 m-1 bg-danger rounded text-white">
          {authUser.fullName}
        </span>
        , check your progress here
      </h5>
      <div className="row">
        <div className="col-12 col-md-6 mb-3 w-50">
          {/* your progress here in pie chart maybe */}
          <div className="col-12 col-md-8">
            <Chart data={chartData} />

            <div className="mb-3 col-auto">
              <button className="btn btn-danger" onClick={handleResetProgress}>
                <IoMdRefresh id="search-icon" /> Reset Progress{" "}
                <i>(for current selected preference)</i>
              </button>
            </div>
          </div>
        </div>
        {/* choosing language preference */}
        <div className="col-12 col-md-6 mb-3 text-capitalize">
          <h5>Language Preference: {authUser.languagePref}</h5>

          <div className="form-floating mb-3">
            <select
              ref={prefRef}
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option value="english">English</option>
              <option value="हिन्दी">हिन्दी</option>
            </select>
            <label htmlFor="floatingSelect">Set Language Preference</label>
          </div>
          {/* update preference */}
          <div className="row">
            <div className="col-auto">
              <button
                type="button"
                onClick={handleUpdateLangPref}
                className="btn btn-primary mb-3"
              >
                Update Preference
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
