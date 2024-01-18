import React, { createContext, useState } from "react";

const userDetail = {
  fullName: "",
  email: "",
  username: "",
  role: null,
  languagePref: "English",
};

export const GlobalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userDetail);

  return (
    <GlobalContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
