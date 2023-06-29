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

import * as React from 'react';
import { HelpPanel, ColumnLayout } from '@cloudscape-design/components';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profileContext';

function Profile({ token }) {
  const {
    userProfile,
    profileLoading,
    getProfile,
  } = useContext(ProfileContext);

  useEffect(() => {
    if (!userProfile?.name) {
      getProfile(token);
    }
  }, []);

  return (
    <>
      <HelpPanel
        loading={profileLoading}
        loadingText="Loading your profile..."
        header={<h3>Profile Info</h3>}
      >
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Name:</h4>
          {userProfile?.name}

          <h4>User Type:</h4>

          {userProfile?.user_type}

          <h4>Native Currency:</h4>
          {userProfile?.native_currency}
        </ColumnLayout>
      </HelpPanel>
    </>
  );
}

export default Profile;
