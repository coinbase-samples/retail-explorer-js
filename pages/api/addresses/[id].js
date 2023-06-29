import { makeCall } from '../retailClient';
export default async function createAddress(req, res) {
  const { token, id, name } = req.query;
  const body = {
    name,
  };
  const payload = JSON.stringify(body);

  let path = `/v2/accounts/${id}/addresses`;

  if (req.method !== 'POST') {
     res.status(400).json({ error: 'Method not allowed' });
      return;
  }
    try {
      const generateAddress = await makeCall(token, path, 'POST', payload);
      const response = await generateAddress.json();
      const newAddress = response.data;

      return res.status(200).json(newAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  } 

