import { makeCall } from '../retailClient';
export default async function handler(req, res) {
  const { query } = req;

  const access_token = query.token;
  let path = `/v2/user`;
  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getUser = await makeCall(access_token, path);
      const userProfile = await getUser.json();
      return res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
