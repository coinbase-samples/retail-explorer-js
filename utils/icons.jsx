import * as React from "react";
// import USD from '../../assets/USD.png';
import {
  Cosmos,
  Solana,
  Bitcoin,
  Ethereum,
  Cardano,
  Polygon,
  Dogecoin,
  DogecoinBadge,
} from "cryptocons";

export const Icons = ({ asset }) => {
  switch (asset) {
    case "BTC":
      return <Bitcoin height="45px" width="45px" />;
    case "BTC_USD":
      return <Bitcoin height="45px" width="45px" />;

    case "ETH":
      return <Ethereum height="45px" width="45px" />;
    case "ETH_USD":
      return <Ethereum height="45px" width="45px" />;
    case "Ethereum":
      return <Ethereum height="45px" width="45px" />;
    case "SOL":
      return <Solana height="45px" width="45px" />;
    case "SOL_USD":
      return <Solana height="45px" width="45px" />;
    case "SOL-USD":
      return <Solana height="45px" width="45px" />;
    case "Solana":
      return <Solana height="45px" width="45px" />;
    case "Matic":
      return <Polygon height="45px" width="45px" />;
    case "Cardano":
      return <Cardano height="45px" width="45px" />;
    case "Atom":
      return <Cosmos height="45px" width="45px" />;
    case "MATIC_USD":
      return <Polygon height="45px" width="45px" />;
    case "MATIC":
      return <Polygon height="45px" width="45px" />;
    case "ADA-USD":
      return <Cardano height="45px" width="45px" />;
    case "ADA_USD":
      return <Cardano height="45px" width="45px" />;
    case "ADA":
      return <Cardano height="45px" width="45px" />;
    case "ATOM_USD":
      return <Cosmos height="45px" width="45px" />;
    case "ATOM":
      return <Cosmos height="45px" width="45px" />;
    case "DOGE_USD":
      return <DogecoinBadge height="45px" width="45px" />;
    case "DOGE":
      return <DogecoinBadge height="45px" width="45px" />;

    case "USD":
      return <img src={USD} alt="USD" />;
    default:
      return;
  }
};
