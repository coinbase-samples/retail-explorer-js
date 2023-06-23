import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  Modal,
  Form,
  FormField,
  Box,
  SpaceBetween,
  Input,
} from "@cloudscape-design/components";

import { AssetContext } from "../context/assetContext";

export function ReceiveForm(props) {
  const { token } = props;
  const { asset } = useContext(AssetContext);
  const [address, setAddress] = useState({});
  const [addressName, setAddressName] = useState("");

  const closeModal = () => {
    props.close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const path = `/api/addresses/${asset}?token=${token}&name=${addressName}`;

      const createAddressResponse = await fetch(path, {
        method: "POST",
      });
      const response = await createAddressResponse.json();
      setAddress(response);
    } catch (error) {
      console.log("error", error);

      closeModal();
    }
  };

  const handleAddressName = (name) => {
    setAddressName(name);
  };

  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      header="Generate Address"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}

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
              onChange={({ detail }) => handleAddressName(detail.value)}
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
