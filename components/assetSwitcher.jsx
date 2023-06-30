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

import React, { useState, useEffect, useContext } from 'react';
import { assetMenuList } from '../utils/assetsList';
import {
  Button,
  Modal,
  Box,
  SpaceBetween,
  Select,
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';

export function AssetSwitcher({ open, close }) {
  const { setAsset } = useContext(AssetContext);
  const [selectedAssetOption, setSelectedAssetOption] = useState({
    label: 'ETH-USD',
    value: 'ETH',
  });

  const initiateAssetSwitch = () => {
    setAsset(selectedAssetOption.value);
    close();
  };

  return (
    <Modal
      onDismiss={close}
      visible={open}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" onClick={initiateAssetSwitch}>
              Ok
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Select the Asset you would like to view"
    >
      <h3>Please select the asset you would like to view:</h3>
      <br />
      <Select
        selectedOption={selectedAssetOption}
        onChange={({ detail }) => setSelectedAssetOption(detail.selectedOption)}
        options={assetMenuList}
        selectedAriaLabel="Selected"
      />
    </Modal>
  );
}
