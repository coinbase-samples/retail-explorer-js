import React, { useState, useEffect, createContext } from "react";

const defaultState = {};

export const ProfileContext = createContext(defaultState);

const ProfileProvider = ({ children }) => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userProfile, setUserProfile] = useState({});

  const getProfile = async (token) => {
    if (fetching && userProfile?.name && loading) {
      return;
    }
    setFetching(true);
    const tokenResponse = await fetch(`/api/user?token=${token}`, {
      method: "GET",
    });

    const data = await tokenResponse.json();

    setUserProfile(data.data);
    setProfileLoading(false);
    setFetching(false);
  };

  const state = {
    userProfile,
    profileLoading,
    getProfile,
    setUserProfile,
  };

  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
