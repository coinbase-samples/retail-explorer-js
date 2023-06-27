import React, { useState, useEffect, createContext } from "react";

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
  const [orderFetching, setOrderFetching] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placingOrderLoading, setPlacingOrderLoading] = useState(false);
  const [userOrder, setUserOrder] = useState({});
  const getOrderByID = async (token, account_id, order_id) => {
    if (orderFetching && order === {} && orderLoading) {
      return;
    }
    setOrderFetching(true);
    setOrderLoading(true);

    const fetchOrderById = await fetch(
      `/api/orders/${order_id}?token=${token}&account_id=${account_id}`,
      {
        method: "GET",
      }
    );
    try {
      const data = await fetchOrderById.json();

      setOrder(data);
      setOrderLoading(false);
      setOrderFetching(false);
    } catch (error) {
      setOrder({});
      console.log("error", error);
      setOrderLoading(false);
      setOrderFetching(false);
    }
  };

  const getOrders = async (token, account_id, asset) => {
    if (fetching && userOrders === [] && loading) {
      return;
    }

    try {
      setFetching(true);
      setOrdersLoading(true);

      const orderResponse = await fetch(
        `/api/orders?token=${token}&asset=${asset}`,
        {
          method: "GET",
        }
      );
      const data = await orderResponse.json();
      if (data.errors) {
        setOrdersLoading(false);
        setFetching(false);
      } else {
        setUserOrders(data);
        setOrdersLoading(false);
        setFetching(false);
      }
    } catch (error) {
      console.log("error", error);
      setOrdersLoading(false);
      setFetching(false);
    }
  };

  const getOpenOrders = async (token, asset) => {
    if (fetching && userOpenOrders === [] && openOrdersLoading) {
      return;
    }

    try {
      setFetchingOpenOrders(true);
      setOpenOrdersLoading(true);

      const orderResponse = await fetch(
        `/api/orders/open?token=${token}&product_id=${asset}`,
        {
          method: "GET",
        }
      );
      const data = await orderResponse.json();

      setUserOpenOrders(data);
      setOrdersLoading(false);
      setFetchingOpenOrders(false);
    } catch (error) {
      console.log("error", error);
      setOpenOrdersLoading(false);
      setFetchingOpenOrders(false);
    }
  };

  const createOrder = async (
    token,
    product_id,
    quote_size,
    side,
    type = "MARKET",
    limitPrice = ""
  ) => {
    let path;
    try {
      if (side === "SELL") {
        path = `/api/orders?token=${token}&product_id=${product_id}-USD&base_size=${quote_size}&side=${side}&type=${type}&limitPrice=${limitPrice}`;
      } else {
        path = `/api/orders?token=${token}&product_id=${product_id}-USD&quote_size=${quote_size}&side=${side}&type=${type}&limitPrice=${limitPrice}`;
      }

      setPlacingOrder(true);
      const createOrderResponse = await fetch(path, {
        method: "POST",
      });
      const data = await createOrderResponse.json();
      console.log("context ", data);
      setUserOrder(data);
      setUserOrders((prevOrders) => [...prevOrders, data]);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
    } catch (error) {
      console.log("error", error);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
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
  };

  return (
    <OrdersContext.Provider value={state}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
