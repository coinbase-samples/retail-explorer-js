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

import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const TransactionsContext = createContext(defaultState);

const TransactionsProvider = ({ children }) => {
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async (token, asset) => {
    if (fetching && transactionsLoading && transactions !== []) {
      return;
    }
    setFetching(true);
    setTransactionsLoading(true);
    const transactionsResponse = await fetch(
      `/api/transactions?token=${token}&product_id=${asset}`,
      {
        method: 'GET',
      },
    );
    const data = await transactionsResponse.json();
    setTransactions(data);
    setFetching(false);
    setTransactionsLoading(false);
  };

  const state = {
    transactionsLoading,
    transactions,
    getTransactions,
  };

  return (
    <TransactionsContext.Provider value={state}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
