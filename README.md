Built with [Next.js](https://nextjs.org/), Coin Auth is a reference implementation app showing how to connect Coinbase users to a third party app using OAuth2.0.  Once connected Coin Auth offers advanced trading, sending and receiving of crypto assets.

## Getting Started

Node install npm and use node version v18.2.0

Install dependencies

```
npm install
```

Create a .env file in the root of the directory and plugin your apps OAuth credentials

````
NEXT_PUBLIC_CLIENT_ID={{YOUR_CLIENT_ID}
NEXT_PUBLIC_CLIENT_SECRET={{YOUR_CLIENT_SECRET}}
NEXT_PUBLIC_BASE_URL=https://api.coinbase.com
NEXT_PUBLIC_REDIRECT_URI={{YOUR_REDIRECT_URI}}}
NEXT_PUBLIC_OAUTH_BASE_URL=https://www.coinbase.com
NEXT_PUBLIC_ENCODED_REDIRECT_URL=http://localhost:3000/

Run the development server:

```bash
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
