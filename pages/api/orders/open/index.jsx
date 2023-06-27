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
