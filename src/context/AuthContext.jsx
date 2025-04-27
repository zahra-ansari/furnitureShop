import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus } from "../utils/helpers";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchLoginStatus() {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn);
    }
    fetchLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export function useAuth() {
  return useContext(AuthContext);
}
