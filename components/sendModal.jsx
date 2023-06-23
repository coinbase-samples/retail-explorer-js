import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Box,
  SpaceBetween,
  FormField,
} from "@cloudscape-design/components";
import { AssetContext } from "../context/assetContext";

export function SendForm(props) {
  const { token } = props;
  const { asset } = useContext(AssetContext);
  const [sendDetails, setSendDetails] = useState({});
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [twoFAReceived, setTwoFAReceived] = useState(false);
  const [twoFAcode, setTwoFAcode] = useState("");

  const closeModal = () => {
    props.close();
  };

  useEffect(() => {
    console.log("this is the txn details:", sendDetails);
  }, [sendDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (twoFAReceived) {
        const path = `/api/transactions/send?token=${token}&to=${to}&amount=${amount}&asset=${asset}&twoFAcode=${twoFAcode}`;
        const createSendResponse = await fetch(path, {
          method: "POST",
        });
        const response = await createSendResponse.json();
        setTwoFAReceived(false);
        setSendDetails(response?.data);
      } else {
        const path = `/api/transactions/send?token=${token}&to=${to}&amount=${amount}&asset=${asset}`;
        const createSend2FA = await fetch(path, {
          method: "POST",
        });

        const response = await createSend2FA.json();
        console.log("2FA sent", response);
        setTwoFAReceived(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handle2FA = (value) => {
    const decimalRegex = /^\d*\.?\d*$/;

    if (decimalRegex.test(value)) {
      setTwoFAcode(value);
    } else {
      setError("Please enter 2FA code");
    }
  };

  const handleTo = async (value) => {
    setTo(value);
    setError("");
  };

  const handleAmount = (value) => {
    const decimalRegex = /^\d*\.?\d*$/;

    if (decimalRegex.test(value)) {
      setAmount(value);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };
  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      header="Send Crypto"
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
                  <Button
                    id="submit"
                    variant={
                      Object.keys(sendDetails).length !== 0
                        ? "ternary"
                        : "primary"
                    }
                  >
                    {Object.keys(sendDetails).length !== 0
                      ? null
                      : `Send ${asset}`}
                  </Button>
                </SpaceBetween>
              </SpaceBetween>
            </Box>
          }
        >
          <FormField label="To:" id="to">
            <Input
              type="text"
              id="to"
              name="to"
              value={to}
              onChange={({ detail }) => handleTo(detail.value)}
            />
          </FormField>
          <FormField label="Amount:" id="amount">
            <Input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={({ detail }) => handleAmount(detail.value)}
            />
          </FormField>
          {error && (
            <div style={{ color: "red" }}>
              <p>{error}</p>
            </div>
          )}
          {twoFAReceived ? (
            <FormField
              label="Please enter your SMS 2FA or Authenticator code:"
              id="twoFA"
            >
              <Input
                type="text"
                id="twoFA"
                name="twoFA"
                value={twoFAcode}
                onChange={({ detail }) => handle2FA(detail.value)}
              />
            </FormField>
          ) : null}

          <div>
            {Object.keys(sendDetails).length !== 0 ? (
              <div>
                <p>
                  <b>Here is your transactions id: {sendDetails?.id}</b>
                </p>
              </div>
            ) : null}
          </div>
        </Form>
      </form>
    </Modal>
  );
}
