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

import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

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
          method: 'POST',
        });
        const data = await tokenResponse.json();
        setAuthToken(data);
      }
    } catch (error) {
      console.log('this was the token error', error);
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
