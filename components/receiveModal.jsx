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

import React, { useState, useContext } from 'react';

import {
  Button,
  Modal,
  Form,
  FormField,
  Box,
  SpaceBetween,
  Input,
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';

export function ReceiveForm({ token, open, close }) {
  const { asset } = useContext(AssetContext);
  const [address, setAddress] = useState({});
  const [addressName, setAddressName] = useState('');

  const closeModal = () => {
    close();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const path = `/api/addresses/${asset}?token=${token}&name=${addressName}`;

      const createAddressResponse = await fetch(path, {
        method: 'POST',
      });
      const response = await createAddressResponse.json();
      setAddress(response);
    } catch (error) {
      console.log('error', error);

      closeModal();
    }
  };

  return (
    <Modal
      onDismiss={closeModal}
      visible={open}
      closeAriaLabel="Close modal"
      header="Generate Address"
    >
      <form onSubmit={handleSubmit}>
        <Form
          id="receiveForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Close
                </Button>
                <SpaceBetween id="formLabel" direction="horizontal" size="xs">
                  {Object.keys(address).length === 0 ? (
                    <Button id="submit" variant="primary">
                      Generate Address
                    </Button>
                  ) : null}
                </SpaceBetween>
              </SpaceBetween>
            </Box>
          }
        >
          <FormField label="Address Name:" id="addressName">
            <Input
              type="text"
              id="addressName"
              name="addressName"
              value={addressName}
              onChange={(event) => setAddressName(event.detail.value)}
            />
          </FormField>

          <div>
            <p>
              <strong>Would you like to generate a {asset} address?</strong>
            </p>
            {Object.keys(address).length !== 0 ? (
              <div>
                <p>
                  <b>Use this address to receive {asset}:</b>
                </p>
                <p>{address.address}</p>
              </div>
            ) : null}
          </div>
        </Form>
      </form>
    </Modal>
  );
}
