import React, { useState, createContext } from 'react';

const defaultState = {};

export const OrdersContext = createContext(defaultState);

const OrdersProvider = ({ children }) => {
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [fetchingOpenOrders, setFetchingOpenOrders] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [openOrdersLoading, setOpenOrdersLoading] = useState(true);
  const [userOpenOrders, setUserOpenOrders] = useState([]);
  const [openOrdersLoaded, setOpenOrdersLoaded] = useState(true);
  const [order, setOrder] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placingOrderLoading, setPlacingOrderLoading] = useState(false);
  const [userOrder, setUserOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const getOrderByID = async (token, orderId) => {
    if (order === {} && orderLoading) {
      return;
    }
    try {
      setOrderLoading(true);
      const fetchOrderById = await fetch(
        `/api/orders/${orderId}?token=${token}`,
      );
      const data = await fetchOrderById.json();
      setOrder(data);
      setOrderLoading(false);
    } catch (error) {
      setOrder({});
      console.log('error', error);
      setOrderLoading(false);
    }
  };

  const getOrders = async (token, asset) => {
    if (fetching || loading) {
      return;
    }

    try {
      setFetching(true);
      setOrdersLoading(true);
      setLoading(true);

      const orderResponse = await fetch(
        `/api/orders?token=${token}&asset=${asset}`,
      );
      const data = await orderResponse.json();
      if (data.errors) {
        setOrdersLoading(false);
        setFetching(false);
        setLoading(false);
      } else {
        setUserOrders(data);
        setOrdersLoading(false);
        setFetching(false);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getOpenOrders = async (token, asset) => {
    if (fetchingOpenOrders || openOrdersLoading) {
      return;
    }
    try {
      setFetchingOpenOrders(true);
      setOpenOrdersLoading(true);
      setLoading(true);

      const orderResponse = await fetch(
        `/api/orders/open?token=${token}&product_id=${asset}`,
      );
      const data = await orderResponse.json();

      setUserOpenOrders(data);
      setOpenOrdersLoading(false);
      setFetchingOpenOrders(false);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const createOrder = async (
    token,
    product_id,
    quote_size,
    side,
    type = 'MARKET',
    limitPrice = '',
  ) => {
    let path;
    try {
      const queryParams = {
        token,
        product_id: `${product_id}-USD`,
        side,
        type,
        limitPrice,
      };

      if (side === 'SELL') {
        queryParams.base_size = quote_size;
      } else {
        queryParams.quote_size = quote_size;
      }

      const queryString = new URLSearchParams(queryParams).toString();
      path = `/api/orders?${queryString}`;

      setPlacingOrder(true);
      setPlacingOrderLoading(true);
      setLoading(true);

      const createOrderResponse = await fetch(path, {
        method: 'POST',
      });
      const data = await createOrderResponse.json();
      setUserOrder(data);
      setUserOrders(prevOrders => [...prevOrders, data]);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
      setLoading(false);
    }
  };

  const state = {
    placingOrder,
    setPlacingOrder,
    placingOrderLoading,
    userOrder,
    createOrder,
    userOrders,
    setUserOrder,
    ordersLoading,
    getOrders,
    getOrderByID,
    order,
    orderLoading,
    setOrderLoading,
    userOpenOrders,
    openOrdersLoading,
    getOpenOrders,
    openOrdersLoaded,
    setOpenOrdersLoaded,
    loading,
  };

  return (
    <OrdersContext.Provider value={state}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
