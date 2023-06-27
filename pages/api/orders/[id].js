import { makeCall } from "../retailClient";

export default async function OrderById(req, res) {
  const { query } = req;

  const { token, account_id, id } = query;
  let path = `/api/v3/brokerage/orders/historical/${id}`;

  if (req.method === "GET") {
    try {
      const getOrderById = await makeCall(token, path);

      const response = await getOrderById.json();
      const userOrder = response.order;

      return res.status(200).json(userOrder);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: "Method not allowed" });
  }
}
