import { makeCall } from "../retailClient";

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
  if (req.method === "GET") {
    // Handle a GET request
    try {
      const getOrders = await makeCall(token, path);
      const response = await getOrders.json();
      const fills = response.fills;

      return res.status(200).json(fills);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "POST") {
    const clientOrderId = Math.random().toString();
    if (type === "LIMIT") {
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
            ...(side === "BUY" ? { quote_size } : { base_size }),
          },
        },
      };
      payload = JSON.stringify(body);
    }

    path = "/api/v3/brokerage/orders";
    try {
      const initiateExecuteOrder = await makeCall(token, path, "POST", payload);

      const response = await initiateExecuteOrder.json();

      return res.status(201).json(response);
    } catch (error) {
      console.log("this was the place order error", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
