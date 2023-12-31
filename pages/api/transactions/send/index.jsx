import { makeCall } from '../../retailClient';
import { uuid } from 'uuidv4';

export default async function sendCrypto(req, res) {
  const { token, to, amount, asset, twoFAcode } = req.query;
  const path = `/v2/accounts/${asset}/transactions`;
  let payload;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const body = {
    type: 'send',
    amount,
    to,
    currency: asset,
    idem: uuid(),
  };
  payload = JSON.stringify(body);

  try {
    const initiateSend = await makeCall(
      token,
      path,
      'POST',
      payload,
      twoFAcode
    );

    const response = await initiateSend.json();

    if (initiateSend.status === 201) {
      res.status(201).json(response);
    } else if (initiateSend.status === 402) {
      return res.status(402).json({ error: response.errors[0] });
    } else {
      return res.status(500).json({ error: response.errors[0] });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
