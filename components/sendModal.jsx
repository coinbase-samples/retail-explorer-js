import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Input,
  Modal,
  Form,
  Box,
  SpaceBetween,
  FormField,
} from '@cloudscape-design/components';
import { AssetContext } from '../context/assetContext';

export function SendForm({ token, open, close }) {
  const { asset } = useContext(AssetContext);
  const [sendDetails, setSendDetails] = useState({});
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [twoFAReceived, setTwoFAReceived] = useState(false);
  const [twoFAcode, setTwoFAcode] = useState('');

  useEffect(() => {
    console.log('this is the txn details: ', sendDetails);
  }, [sendDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let path = `/api/transactions/send?token=${token}&to=${to}&amount=${amount}&asset=${asset}`;

      if (twoFAReceived) {
        path = `${path}&twoFAcode=${twoFAcode}`;

        const createSend2FA = await fetch(path, {
          method: 'POST',
        });

        const response = await createSend2FA.json();
        console.log('2FA sent', response);
        setTwoFAReceived(false);
        setSendDetails(response?.data);
      } else {
        const createSendResponse = await fetch(path, {
          method: 'POST',
        });

        const response = await createSendResponse.json();
        setTwoFAReceived(true);
        setSendDetails(response?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Modal
      onDismiss={close}
      visible={open}
      closeAriaLabel="Close modal"
      header="Send Crypto"
    >
      <form onSubmit={handleSubmit}>
        <Form
          id="receiveForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={close}>
                  Close
                </Button>
                <SpaceBetween id="formLabel" direction="horizontal" size="xs">
                  <Button
                    id="submit"
                    variant={sendDetails?.id ? 'normal' : 'primary'}
                  >
                    {sendDetails?.id ? '' : `Send ${asset}`}
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
              onChange={({ detail }) => setTo(detail.value)}
            />
          </FormField>
          <FormField label="Amount:" id="amount">
            <Input
              type="number"
              step="0.001"
              id="amount"
              name="amount"
              value={amount}
              onChange={({ detail }) => setAmount(detail.value)}
            />
          </FormField>

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
                onChange={({ detail }) => setTwoFAcode(detail.value)}
              />
            </FormField>
          ) : null}

          <div>
            {sendDetails?.id && !twoFAReceived && (
              <div>
                <p>
                  <b>Here is your transaction ID: {sendDetails.id}</b>
                </p>
              </div>
            )}
          </div>
        </Form>
      </form>
    </Modal>
  );
}
