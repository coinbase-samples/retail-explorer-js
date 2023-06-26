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

import * as React from 'react';
import {
  Cosmos,
  Solana,
  Bitcoin,
  Ethereum,
  Cardano,
  Polygon,
  DogecoinBadge,
} from 'cryptocons';

export const Icons = ({ asset }) => {
  switch (asset) {
    case 'BTC':
      return <Bitcoin height="45px" width="45px" />;
    case 'BTC_USD':
      return <Bitcoin height="45px" width="45px" />;

    case 'ETH':
      return <Ethereum height="45px" width="45px" />;
    case 'ETH_USD':
      return <Ethereum height="45px" width="45px" />;
    case 'Ethereum':
      return <Ethereum height="45px" width="45px" />;
    case 'SOL':
      return <Solana height="45px" width="45px" />;
    case 'SOL_USD':
      return <Solana height="45px" width="45px" />;
    case 'SOL-USD':
      return <Solana height="45px" width="45px" />;
    case 'Solana':
      return <Solana height="45px" width="45px" />;
    case 'Matic':
      return <Polygon height="45px" width="45px" />;
    case 'Cardano':
      return <Cardano height="45px" width="45px" />;
    case 'Atom':
      return <Cosmos height="45px" width="45px" />;
    case 'MATIC_USD':
      return <Polygon height="45px" width="45px" />;
    case 'MATIC':
      return <Polygon height="45px" width="45px" />;
    case 'ADA-USD':
      return <Cardano height="45px" width="45px" />;
    case 'ADA_USD':
      return <Cardano height="45px" width="45px" />;
    case 'ADA':
      return <Cardano height="45px" width="45px" />;
    case 'ATOM_USD':
      return <Cosmos height="45px" width="45px" />;
    case 'ATOM':
      return <Cosmos height="45px" width="45px" />;
    case 'DOGE_USD':
      return <DogecoinBadge height="45px" width="45px" />;
    case 'DOGE':
      return <DogecoinBadge height="45px" width="45px" />;

    case 'USD':
      return <img src={USD} alt="USD" />;
    default:
      return;
  }
};
