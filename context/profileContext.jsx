/**
 * Copyright 2023 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const ProfileContext = createContext(defaultState);

const ProfileProvider = ({ children }) => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userProfile, setUserProfile] = useState({});

  const getProfile = async token => {
    if (fetching && userProfile?.name && loading) {
      return;
    }
    setFetching(true);
    const tokenResponse = await fetch(`/api/user?token=${token}`, {
      method: 'GET',
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
