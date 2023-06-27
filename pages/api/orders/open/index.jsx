import { makeCall } from '../../retailClient';

export default async function listOpenOrders(req, res) {
  const { query } = req;
  const { token, product_id } = query;

  let path = `/api/v3/brokerage/orders/historical/batch?order_status=OPEN&product_id=${product_id}-USD`;

  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getOpenOrders = await makeCall(token, path);
      const response = await getOpenOrders.json();
      const openOrders = response.orders;

      return res.status(200).json(openOrders);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
