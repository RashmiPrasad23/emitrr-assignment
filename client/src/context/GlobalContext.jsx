import React, { createContext, useState } from "react";

const userDetail = {
  fullName: "",
  email: "",
  username: "",
  role: null,
  languagePref: "",
};

export const GlobalContext = createContext(null);

// global context for storing data so that data could directly
// be used from here to avoid prop drilling
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
