export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle a POST request
    const { query } = req;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_ENCODED_REDIRECT_URL;
    const oauthUrl = process.env.NEXT_PUBLIC_OAUTH_BASE_URL;

    const targetUrl = `${oauthUrl}/oauth/token`;
    const payload = {
      grant_type: 'authorization_code',
      code: query.code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
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
