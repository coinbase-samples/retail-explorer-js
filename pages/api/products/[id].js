import { makeCall } from '../retailClient';

export default async function ProductById(req, res) {
  const { token, id } = req.query;
  const path = `/api/v3/brokerage/products/${id}`;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
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
