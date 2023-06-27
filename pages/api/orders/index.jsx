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

import { makeCall } from '../retailClient';

export default async function orders(req, res) {
  const { query } = req;
  const {
    token,
    product_id,
    side,
    quote_size,
    asset,
    type,
    limitPrice,
    base_size,
  } = query;
  let path = `/api/v3/brokerage/orders/historical/fills?product_id=${asset}-USD`;
  let payload;
  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getOrders = await makeCall(token, path);
      const response = await getOrders.json();
      const fills = response.fills;

      return res.status(200).json(fills);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    const clientOrderId = Math.random().toString();
    if (type === 'LIMIT') {
      const body = {
        clientOrderId,
        product_id,
        side,
        order_configuration: {
          limit_limit_gtc: {
            base_size: quote_size,
            limit_price: limitPrice,
          },
        },
      };
      payload = JSON.stringify(body);
    } else {
      const body = {
        clientOrderId,
        product_id,
        side,
        order_configuration: {
          market_market_ioc: {
            ...(side === 'BUY' ? { quote_size } : { base_size }),
          },
        },
      };
      payload = JSON.stringify(body);
    }

    path = '/api/v3/brokerage/orders';
    try {
      const initiateExecuteOrder = await makeCall(token, path, 'POST', payload);

      const response = await initiateExecuteOrder.json();

      return res.status(201).json(response);
    } catch (error) {
      console.log('this was the place order error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
