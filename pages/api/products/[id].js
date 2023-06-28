import { makeCall } from '../retailClient';

export default async function ProductById(req, res) {
  const { token, id } = req.query;
  let path = `/api/v3/brokerage/products/${id}`;

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' });
  }
    try {
      const getProductById = await makeCall(token, path);

      const response = await getProductById.json();

      return res.status(200).json(response);
    } catch (error) {
      console.log('this was the user profile error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } 

