import { makeCall } from '../retailClient';

export default async function listTransactions(req, res) {
  const { token, product_id } = req.query;
  const path = `/v2/accounts/${product_id}/transactions`;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const getTransactions = await makeCall(token, path);
    const response = await getTransactions.json();
    const transactions = response.data;

    return res.status(200).json(transactions);
  } catch (error) {
    console.log('this was the user orders error', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
