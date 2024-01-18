import React, { useContext, useRef, useEffect } from "react";
import Base from "../layout/Base";
import { IoMdRefresh } from "react-icons/io";
import { GlobalContext } from "../context/GlobalContext";
import apiClient from "../apiClient/apiClient";
import { toast } from "react-toastify";

const Profile = () => {
  const prefRef = useRef();
  const { authUser } = useContext(GlobalContext);
  useEffect(() => {
    prefRef.current.value = authUser.languagePref;
  }, [authUser]);

  const handleUpdateLangPref = async () => {
    let { data } = await apiClient.patch(`/users/update-preference`, {
      languagePref: prefRef.current.value,
    });
    if (data.success) {
      toast.success(data.message);
    }
  };
  return (
    <Base title="profile">
      <h2>Profile</h2>
      <h2>Welcome, {authUser.fullName}, here is your progress</h2>
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          your progress here in pie chart maybe
        </div>
        <div className="col-12 col-md-6 mb-3">
          <h5>Language Preference: English</h5>

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

            <div className="mb-3 col-auto">
              <button className="btn btn-danger">
                <IoMdRefresh id="search-icon" /> Reset Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
