import { makeCall } from '../../retailClient';

export default async function listOpenOrders(req, res) {
  const { token, product_id } = req.query;

  const path = `/api/v3/brokerage/orders/historical/batch?order_status=OPEN&product_id=${product_id}-USD`;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const getOpenOrders = await makeCall(token, path);
    const response = await getOpenOrders.json();
    const openOrders = response.orders;

    return res.status(200).json(openOrders);
  } catch (error) {
    console.log('this was the user orders error', error);
    return res.status(500).json({ error: error.message });
  }
}
