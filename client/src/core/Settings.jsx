import React, { useEffect, useRef, useContext, useState } from "react";
import Base from "../layout/Base";
import apiClient from "../apiClient/apiClient";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const Settings = () => {
  const { authUser, setAuthUser } = useContext(GlobalContext);
  const usernameRef = useRef("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    usernameRef.current.value = authUser.username;
    nameRef.current.value = authUser.fullName;
    emailRef.current.value = authUser.email;
  }, [authUser]);

  const handleUpdateUserDetails = async () => {
    //update details that are changed
    try {
      let rawData = {
        fullName: nameRef.current.value,
        email: emailRef.current.value,
        username: usernameRef.current.value,
      };
      if (passwordRef.current.value) {
        rawData.password = passwordRef.current.value;
      }

      let { data } = await apiClient.patch(`/settings/putUserDetails`, rawData);
      if (data.success) {
        setAuthUser({
          ...authUser,
          fullName: nameRef.current.value,
          email: emailRef.current.value,
          username: usernameRef.current.value,
        });
        toast.success(data.message);
        passwordRef.current.value = "";
      }
    } catch (error) {
      toast.error("Error loggin again");
    }
  };

  return (
    <Base title="Settings">
      <h2 className="p-3 shadow-sm">View/Update Settings</h2>
      {/* name */}
      <div className="mb-3">
        <label htmlFor="Input1" className="form-label">
          Full Name
        </label>
        <input
          ref={nameRef}
          type="text"
          className="form-control"
          id="Input1"
          placeholder="Rashmi Roy"
        />
      </div>
      {/* username */}
      <div className="mb-3">
        <label htmlFor="Input2" className="form-label">
          Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          className="form-control"
          id="Input2"
          placeholder="Username123"
        />
      </div>
      {/* email */}
      <div className="mb-3">
        <label htmlFor="Input3" className="form-label">
          Email address
        </label>
        <input
          ref={emailRef}
          type="email"
          className="form-control"
          id="Input3"
          placeholder="name@example.com"
        />
      </div>
      {/* password */}
      <div className="mb-3">
        <label htmlFor="Input4" className="form-label">
          Password
        </label>
        <input
          ref={passwordRef}
          type="text"
          className="form-control"
          id="Input4"
          placeholder="Password (leave empty if you dont want to update password)"
        />
      </div>
      {/* submit button */}
      <div className="mb-3">
        <button
          type="button"
          onClick={handleUpdateUserDetails}
          className="btn btn-primary mb-3"
        >
          Update Details
        </button>
      </div>
    </Base>
  );
};

export default Settings;
