import { makeCall } from '../retailClient';

export default async function OrderById(req, res) {
  const { token, id } = req.query;
  let path = `/api/v3/brokerage/orders/historical/${id}`;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const getOrderById = await makeCall(token, path);
      const response = await getOrderById.json();
      const userOrder = response.order;

      return res.status(200).json(userOrder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
