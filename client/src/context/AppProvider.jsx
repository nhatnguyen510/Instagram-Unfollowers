import React, { createContext, useState, useEffect, useRef } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useRef(false);
  const twoFactorUser = useRef(null);

  useEffect(() => {
    const ParsedUser = JSON.parse(localStorage.getItem("user"));
    if (ParsedUser) {
      isLoggedIn.current = true;
      setUser((prevUser) => ({ ...prevUser, ...ParsedUser }));
    } else {
      isLoggedIn.current = false;
      setUser({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn.current]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        isLoading,
        setIsLoading,
        twoFactorUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
