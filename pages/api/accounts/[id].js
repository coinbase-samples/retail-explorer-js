import { makeCall } from '../retailClient';
export default async function listAccount(req, res) {
  const { token, id } = req.query;

  const path = `/v2/accounts/${id}`;
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const getAccount = await makeCall(token, path);
    const response = await getAccount.json();
    const AccountById = response.data;

    return res.status(200).json(AccountById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
