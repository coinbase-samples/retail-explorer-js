export default async function revoke(req, res) {
  if (req.method === 'POST') {
    // Handle a POST request
    const { token } = req;
    const targetUrl = `https://api.coinbase.com/oauth/revoke`;
    const payload = {
      token,
      Authorization: `Bearer ${token}`,
    };
    try {
      const tokenResponse = await fetch(targetUrl, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        method: 'POST',
        body: new URLSearchParams(payload),
      });

      const data = await tokenResponse.json();
      res.status(tokenResponse.status).json(data);

      return data;
    } catch (error) {
      console.log('this was the token error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
