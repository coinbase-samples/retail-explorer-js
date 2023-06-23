import React, { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

const defaultState = {};

export const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState({});
  const [gettingToken, setGettingToken] = useState(false);
  const router = useRouter();

  const cachedAuthToken = authToken?.access_token;

  const getAuthToken = async (code) => {
    try {
      if (cachedAuthToken) {
        router.push(`/landing?token=${cachedAuthToken}`);
      } else {
        const tokenResponse = await fetch(`/api/oauth?code=${code}`, {
          method: "POST",
        });
        const data = await tokenResponse.json();
        setAuthToken(data);
      }
    } catch (error) {
      console.log("this was the token error", error);
    }
  };

  useEffect(() => {
    setAuthToken(authToken);
  }, []);

  const state = {
    getAuthToken,
    authToken: cachedAuthToken,
    gettingToken,
    setGettingToken,
    setAuthToken,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
