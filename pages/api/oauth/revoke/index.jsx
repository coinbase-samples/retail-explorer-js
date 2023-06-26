/**
 * Copyright 2023 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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
