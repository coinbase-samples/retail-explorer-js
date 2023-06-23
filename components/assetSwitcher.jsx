import React, { useState, useEffect, useContext } from "react";
import { assetMenuList } from "../utils/assetsList";
import {
  Button,
  Modal,
  Box,
  SpaceBetween,
  Select,
} from "@cloudscape-design/components";

import { AssetContext } from "../context/assetContext";

export function AssetSwitcher(props) {
  const { setAsset } = useContext(AssetContext);
  const [selectedAssetOption, setSelectedAssetOption] = useState({
    label: "ETH-USD",
    value: "ETH",
  });

  useEffect(() => {
    if (props.open) {
      setSelectedAssetOption({
        label: "ETH-USD",
        value: "ETH",
      });
    }
  }, [props.open]);

  const closeModal = () => {
    props.close();
  };

  const initiateAssetSwitch = () => {
    setAsset(selectedAssetOption.value);
    closeModal();
  };

  return (
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
