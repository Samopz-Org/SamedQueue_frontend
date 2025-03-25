import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
