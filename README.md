Built with [Next.js](https://nextjs.org/), Retail Explorer is a reference implementation app showing how to connect Coinbase users to a third party app using [OAuth2.0- OAuth 2.0 is the industry-standard protocol for authorization.](https://oauth.net/2/).

 Once connected Retail Explorer offers advanced trading, sending and receiving of crypto assets.

## Getting Started

Switch to Node version 18 or higher

```
nvm use 18
```

Install dependencies

```
npm install
```

Create a .env file in the root of the directory and plugin your apps Coinbase credentials. You can find them here:  https://www.coinbase.com/settings/api >> click 'New Oauth2 Application'

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
