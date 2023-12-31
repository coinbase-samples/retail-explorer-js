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

import React, { useState, useEffect, useContext } from 'react';

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
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';
import { OrdersContext } from '../context/ordersContext';

export function TradeForm({ token, price, open, close }) {
  const { userOrder, placingOrder, createOrder, setUserOrder } =
    useContext(OrdersContext);

  const { asset } = useContext(AssetContext);
  const [quoteSize, setQuoteSize] = useState('1');
  const [error, setError] = useState('');
  const [baseCurrency, setBaseCurrency] = useState(5);
  const [limitPrice, setLimitPrice] = useState(price);
  const [orderError, setOrderError] = useState('');

  const [selectedOrderType, setSelectedOrderType] = useState({
    label: 'MARKET',
    value: 'MARKET',
  });

  const [selectedOrderSide, setSelectedOrderSide] = useState({
    label: 'BUY',
    value: 'BUY',
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const order = await createOrder(
        token,
        asset,
        selectedOrderSide.value === 'SELL' ||
          selectedOrderType.value === 'LIMIT'
          ? baseCurrency
          : quoteSize,
        selectedOrderSide.value,
        selectedOrderType.value,
        limitPrice,
      );
    } catch (error) {
      console.log('error', error);
      alert(error.message);
      close();
    }
  };

  useEffect(() => {
    if (userOrder.success !== null) {
      if (userOrder.success === true) {
        alert(
          `Your order success is ${userOrder?.success} and your Order Id is ${userOrder.order_id}.`,
        );
        setUserOrder({});
        close();
      } else {
        setOrderError(userOrder?.error_response?.message);
      }
    }
  }, [userOrder.success]);

  useEffect(() => {
    if (!open) {
      setOrderError('');
    }
  }, [open]);

  return (
    <Modal
      onDismiss={close}
      visible={open}
      closeAriaLabel="Close modal"
      header="Place order"
    >
      {placingOrder ? <Spinner /> : null}
      <form onSubmit={handleSubmit}>
        <Form
          id="tradeForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={close}>
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
                { label: 'MARKET', value: 'MARKET' },
                { label: 'LIMIT', value: 'LIMIT' },
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
                { label: 'BUY', value: 'BUY' },
                { label: 'SELL', value: 'SELL' },
              ]}
              selectedAriaLabel="Selected Side"
            />
          </FormField>
          {selectedOrderType.value === 'LIMIT' ? (
            <FormField label="Limit Price" id="lPrice" errorText={error}>
              <Input
                id="price"
                type="number"
                step="0.01"
                onChange={({ detail }) => setLimitPrice(detail.value)}
                value={limitPrice}
              />
            </FormField>
          ) : null}
          {selectedOrderSide.value === 'BUY' &&
          selectedOrderType.value === 'MARKET' ? (
            <FormField label="quote size" id="quote" errorText={error}>
              <Input
                id="inputQuouteSize"
                type="number"
                step="0.01"
                onChange={({ detail }) => setQuoteSize(detail.value)}
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
                type="number"
                step="0.01"
                onChange={({ detail }) => setBaseCurrency(detail.value)}
                value={baseCurrency}
              />
            </FormField>
          )}
          {orderError !== '' ? (
            <p style={{ color: 'red' }}>{orderError}</p>
          ) : null}
        </Form>
      </form>
    </Modal>
  );
}
