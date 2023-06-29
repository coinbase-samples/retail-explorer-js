import { makeCall } from '../retailClient';

export default async function listAccounts(req, res) {
  const { token } = req.query;
  let path = '/v2/accounts';

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const getAccounts = await makeCall(token, path);

    const response = await getAccounts.json();
    const userAccounts = response;

    return res.status(200).json(userAccounts);
  } catch (error) {
    console.log('this was the user orders error', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
