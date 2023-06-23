import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  Modal,
  Form,
  FormField,
  Box,
  SpaceBetween,
  Select,
  Spinner,
  Input,
} from "@cloudscape-design/components";

import { AssetContext } from "../context/assetContext";
import { OrdersContext } from "../context/ordersContext";

export function TradeForm(props) {
  const { userOrder, placingOrder, createOrder, setUserOrder } =
    useContext(OrdersContext);

  const { token, price } = props;
  const { asset } = useContext(AssetContext);
  const [quoteSize, setQuoteSize] = useState("1");
  const [error, setError] = useState("");
  const [baseCurrency, setBaseCurrency] = useState(5);
  const [limitPrice, setLimitPrice] = useState(price);
  const [orderError, setOrderError] = useState("");

  const [selectedOrderType, setSelectedOrderType] = useState({
    label: "MARKET",
    value: "MARKET",
  });

  const [selectedOrderSide, setSelectedOrderSide] = useState({
    label: "BUY",
    value: "BUY",
  });

  const closeModal = () => {
    props.close();
  };

  const handleQuoteSize = (quote) => {
    const decimalRegex = /^\d+(\.\d+)?$/;
    if (decimalRegex.test(quote)) {
      setQuoteSize(quote);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleBaseCurrency = (bsc) => {
    if (!isNaN(+bsc)) {
      setBaseCurrency(bsc);
    } else {
      setError("Please enter an integer value");
    }
  };

  const handlePrice = (price) => {
    const decimalRegex = /^\d+(\.\d+)?$/;
    if (decimalRegex.test(price)) {
      setLimitPrice(price);
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const order = await createOrder(
        token,
        asset,
        selectedOrderSide.value === "SELL" ||
          selectedOrderType.value === "LIMIT"
          ? baseCurrency
          : quoteSize,
        selectedOrderSide.value,
        selectedOrderType.value,
        limitPrice
      );
    } catch (error) {
      console.log("error", error);
      alert(error.message);
      closeModal();
    }
  };

  useEffect(() => {
    if (userOrder.success !== null) {
      if (userOrder.success === true) {
        alert(
          `Your order success was ${userOrder?.success} and your Order Id is ${userOrder.order_id}.`
        );
        setUserOrder({});
        closeModal();
      } else {
        setOrderError(userOrder?.error_response?.message);
      }
    }
  }, [userOrder.success]);

  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      header="Place order"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}
      {placingOrder ? <Spinner /> : null}
      <form onSubmit={handleSubmit}>
        <Form
          id="tradeForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Cancel
                </Button>
                <SpaceBetween id="formLabel" direction="horizontal" size="xs">
                  <Button id="submit" variant="primary">
                    {selectedOrderSide.label} {asset}
                  </Button>
                </SpaceBetween>
              </SpaceBetween>
            </Box>
          }
        >
          <FormField label="Order Type" id="oType" errorText={error}>
            <Select
              label="Choose Order Type"
              selectedOption={selectedOrderType}
              onChange={({ detail }) =>
                setSelectedOrderType(detail.selectedOption)
              }
              options={[
                { label: "MARKET", value: "MARKET" },
                { label: "LIMIT", value: "LIMIT" },
              ]}
              selectedAriaLabel="Selected Order Type"
            />
          </FormField>
          <FormField label="Side:" id="side" errorText={error}>
            <Select
              id="selectedSide"
              selectedOption={selectedOrderSide}
              onChange={({ detail }) =>
                setSelectedOrderSide(detail.selectedOption)
              }
              options={[
                { label: "BUY", value: "BUY" },
                { label: "SELL", value: "SELL" },
              ]}
              selectedAriaLabel="Selected Side"
            />
          </FormField>
          {selectedOrderType.value === "LIMIT" ? (
            <FormField label="Limit Price" id="lPrice" errorText={error}>
              <Input
                id="price"
                onChange={({ detail }) => handlePrice(detail.value)}
                value={limitPrice}
              />
            </FormField>
          ) : null}
          {selectedOrderSide.value === "BUY" &&
          selectedOrderType.value === "MARKET" ? (
            <FormField label="quote size" id="quote" errorText={error}>
              <Input
                id="inputQuouteSize"
                onChange={({ detail }) => handleQuoteSize(detail.value)}
                value={quoteSize}
              />
            </FormField>
          ) : (
            <FormField
              label="Base Currency"
              id="base_currency"
              errorText={error}
            >
              <Input
                id="baseCurrency"
                onChange={({ detail }) => handleBaseCurrency(detail.value)}
                value={baseCurrency}
              />
            </FormField>
          )}
          {orderError !== "" ? (
            <p style={{ color: "red" }}>{orderError}</p>
          ) : null}
        </Form>
      </form>
    </Modal>
  );
}
