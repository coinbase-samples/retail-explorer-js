import { makeCall } from "../../retailClient";
import { uuid } from "uuidv4";
import { response } from "express";
export default async function orders(req, res) {
  const { query } = req;
  const { token, to, amount, asset, twoFAcode } = query;
  let path = `/v2/accounts/${asset}/transactions`;
  let payload;
  if (req.method === "POST") {
    const body = {
      type: "send",
      amount,
      to,
      currency: asset,
      idem: uuid(),
    };
    payload = JSON.stringify(body);

    try {
      const initiateSend = await makeCall(
        token,
        path,
        "POST",
        payload,
        twoFAcode
      );

      const response = await initiateSend.json();

      if (initiateSend.status === 201) {
        res.status(201).json(response);
      } else if (initiateSend.status === 402) {
        return res.status(402).json({ error: response.errors[0] });
      } else {
        return res.status(500).json({ error: response.errors[0] });
      }
    } catch (error) {
      console.log("this was the  send error", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: "Method not allowed" });
  }
}
