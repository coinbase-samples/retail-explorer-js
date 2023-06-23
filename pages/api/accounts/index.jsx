import { makeCall } from "../retailClient";

export default async function listAccounts(req, res) {
  const { query } = req;

  const { token } = query;
  let path = `/v2/accounts`;

  if (req.method === "GET") {
    // Handle a GET request
    try {
      const getAccounts = await makeCall(token, path);

      const response = await getAccounts.json();
      const userAccounts = response;

      return res.status(200).json(userAccounts);
    } catch (error) {
      console.log("this was the user orders error", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: "Method not allowed" });
  }
}
