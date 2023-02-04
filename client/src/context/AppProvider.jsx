import React, { createContext, useState, useEffect } from "react";
import { fetchDecryptedUser, fetchEncryptedUser } from "../api/user";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const encryptedUser = localStorage.getItem("user");
    if (encryptedUser) {
      fetchDecryptedUser(encryptedUser).then(({ decryptedUser }) => {
        setUser((prevUser) => ({ ...prevUser, ...decryptedUser }));
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      fetchEncryptedUser(user).then(({ encryptedUser }) => {
        localStorage.setItem("user", encryptedUser);
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
