import {
  clientId,
  clientSecret,
  encodedRedirectUri,
  oauthUrl,
} from '../../../utils/constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' });
  }
  try {
    const { code } = req.query;

    const targetUrl = `${oauthUrl}/oauth/token`;
    const payload = {
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: encodedRedirectUri,
    };
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
    console.log('this was the authorization error:', error);
    res.status(500).json({ error: error.message });
    return;
  }
}
