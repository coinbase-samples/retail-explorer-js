import { makeCall } from '../retailClient';
export default async function handler(req, res) {
  const { token } = req.query;

  let path = `/v2/user`;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const getUser = await makeCall(token, path);
    const userProfile = await getUser.json();
    return res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
