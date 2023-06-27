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

import React, { useState, useEffect } from 'react';
import { SelectScopes } from './selectScopes';

import {
  Button,
  Modal,
  Box,
  SpaceBetween,
} from '@cloudscape-design/components';

export function UserConnect(props) {
  const [connectModal, setConnectModal] = useState(false);
  const [selectedScopeOptions, setSelectedScopeOptions] = React.useState([]);

  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const OAUTH_BASE_URL = process.env.NEXT_PUBLIC_OAUTH_BASE_URL;

  useEffect(() => {
    if (window.opener) {
      console.log('window opener ', window.opener);
    }
  }, []);

  function generateRandomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const initiateOauth = () => {
    const scope = selectedScopeOptions.map(scope => scope.value).join(' ');
    const state = generateRandomString(10);
    const authorizeUrl = `${OAUTH_BASE_URL}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&account=all&meta[account]=all&meta[send_limit_amount]=1.00&meta[send_limit_currency]=USD&meta[send_limit_period]=month`;

    window.location.href = authorizeUrl;
  };
  const closeModal = () => {
    setConnectModal(false);
    props.close();
  };

  return !connectModal ? (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={initiateOauth}>
              Ok
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Connect Coinbase Account"
    >
      <h3>Please select the scopes you would like to approve?</h3>
      <br />
      <SelectScopes
        selectedScopeOptions={selectedScopeOptions}
        setSelectedScopeOptions={setSelectedScopeOptions}
      />
    </Modal>
  ) : (
    ''
  );
}
