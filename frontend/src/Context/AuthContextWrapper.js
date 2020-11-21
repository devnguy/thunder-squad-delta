import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextWrapper = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
