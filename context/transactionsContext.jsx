import React, { useState, useEffect, createContext } from "react";

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
        method: "GET",
      }
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
