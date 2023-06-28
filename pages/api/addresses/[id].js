import { makeCall } from '../retailClient';
export default async function createAddress(req, res) {
  const { token, id, name } = req.query;
  const body = {
    name,
  };
  const payload = JSON.stringify(body);

  let path = `/v2/accounts/${id}/addresses`;

  if (req.method !== 'POST') {
     return  res.status(400).json({ error: 'Method not allowed' });
  }
    try {
      const generateAddress = await makeCall(token, path, 'POST', payload);
      const response = await generateAddress.json();
      const newAddress = response.data;

      return res.status(200).json(newAddress);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } 

