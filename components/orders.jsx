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

import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Box,
  SpaceBetween,
  ColumnLayout,
  HelpPanel,
} from '@cloudscape-design/components';
import { OrdersContext } from '../context/ordersContext';

import { AssetContext } from '../context/assetContext';
function Orders({ token, type }) {
  const {
    getOrders,
    getOpenOrders,
    userOrders,
    userOpenOrders,
    ordersLoading,
    order,
    getOrderByID,
    orderLoading,
    setOrderLoading,
  } = useContext(OrdersContext);

  const { asset } = useContext(AssetContext);
  const [detailsModal, setDetailsModal] = useState(false);

  useEffect(() => {
    if (userOrders !== []) {
      if (type === 'open') {
        getOpenOrders(token, asset);
      } else {
        getOrders(token, asset);
      }
    }
  }, [asset]);

  const handleSort = sortingState => {
    userOrders(sortingState);
  };

  const openModal = async id => {
    setDetailsModal(true);
    await getOrderByID(token, id);
  };

  const closeModal = () => {
    setDetailsModal(false);
  }

  return (
    <>
      <Table
        resizableColumns={true}
        trackBy="entry_id"
        sortingDescending
        onSortingChange={handleSort}
        variant="container"
        columnDefinitions={[
          {
            id: 'order_id',
            header: 'Order Id',
            cell: e => e.order_id,
            width: 150,
            minWidth: 150,
            sortingField: 'order_id',
          },
          {
            id: 'asset',
            header: 'Asset',
            cell: e => e.product_id,
            width: 130,
            minWidth: 130,
            sortingField: 'asset',
          },
          {
            id: 'size',
            header: type === 'filled' ? 'Size' : 'Filled Size',
            cell: e => (type === 'filled' ? e.size : e.filled_size),
            width: 135,
            minWidth: 135,
            sortingField: 'size',
          },
          {
            id: 'created_at',
            header: type === 'Order Date' ? 'Order Date' : 'Created Date',
            cell: e => (type === 'filled' ? e.trade_time : e.created_time),
            width: 150,
            minWidth: 150,
            sortingField: 'created_at',
          },
          {
            id: 'details',
            header: 'Details',
            cell: e => (
              <Button onClick={() => openModal(e.order_id)}>Details</Button>
            ),
            width: 150,
            minWidth: 150,
          },
        ]}
        items={type === 'filled' ? userOrders : userOpenOrders}
        loading={ordersLoading}
        loadingText="Loading Orders..."
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Orders Found</b>
          </Box>
        }
      />
      {detailsModal && ( 
        <Modal
          onDismiss={closeModal}
          visible={detailsModal}
          closeAriaLabel="Close modal"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Close
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="Order Detail"
        >
          <>
            <HelpPanel>
              <ColumnLayout
                variant="text-grid"
                borders="horizontal"
                columns={2}
                loadingText="Loading Order Detail..."
                loading={orderLoading}
              >
                <h3>Asset:</h3>
                {order?.product_id}
                <h4>Order Id:</h4>
                {order?.order_id}
                <h4>Status:</h4>
                {order?.status}
                <h4>Date:</h4>
                {order?.created_time}
                <h4>Average Fill Price:</h4>
                {order?.average_filled_price}
                <h4>Order Type:</h4>
                {order?.order_type}
                <h4>Fill Value:</h4>
                {order?.filled_value}
                <h4>Side:</h4>
                {order?.side}
                <h4>Number of Fills:</h4>
                {order?.number_of_fills}
              </ColumnLayout>
            </HelpPanel>
          </>
        </Modal>
      )}
    </>
  );
}

export default Orders;
