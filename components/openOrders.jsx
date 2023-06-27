import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Box,
  SpaceBetween,
  ColumnLayout,
  HelpPanel,
} from "@cloudscape-design/components";
import { OrdersContext } from "../context/ordersContext";

import { AssetContext } from "../context/assetContext";
function OpenOrders(props) {
  const {
    getOpenOrders,
    userOpenOrders,
    OpenOrdersLoading: openOrdersLoaded,
    order,
    getOrderByID,
    orderLoading: orderLoaded,
    setOrderLoading,
  } = useContext(OrdersContext);

  const { userAsset, asset } = useContext(AssetContext);
  const assetObject = userAsset;
  const walletId = assetObject?.id;
  const token = props.token;
  const [detailsModal, setDetailsModal] = useState(false);

  useEffect(() => {
    if (userOpenOrders !== []) {
      getOpenOrders(token, walletId, asset);
    }
  }, [asset]); // useEffect now depends on userOpenOrders

  const handleSort = (sortingState) => {
    // using sortingState instead of event
    userOpenOrders(sortingState); // updating userOpenOrders with sorting state
  };

  const openModal = async (id) => {
    setDetailsModal(true);
    setOrderLoading(true);
    await getOrderByID(token, walletId, id);
  };

  const closeModal = () => {
    setDetailsModal(false);
  };

  const cancelOrder = () => {
    alert("Order Cancelled");
  };

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
            id: "order_id",
            header: "Order Id",
            cell: (e) => e.order_id,
            width: 150,
            minWidth: 150,
            sortingField: "order_id",
          },
          {
            id: "asset",
            header: "Asset",
            cell: (e) => e.product_id,
            width: 130,
            minWidth: 130,
            sortingField: "asset",
          },
          {
            id: "filled_size",
            header: "Filled Size",
            cell: (e) => e.filled_size,
            width: 135,
            minWidth: 135,
            sortingField: "filled_size",
          },
          {
            id: "created_at",
            header: "Order Date",
            cell: (e) => e.created_time,
            width: 150,
            minWidth: 150,
            sortingField: "created_at",
          },
          {
            id: "details",
            header: "Details",
            cell: (e) => (
              <Button onClick={() => openModal(e.order_id)}>Details</Button>
            ),
            width: 150,
            minWidth: 150,
          },
        ]}
        items={userOpenOrders}
        loading={openOrdersLoaded}
        loadingText="Loading Open Orders..."
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Open Orders Found</b>
          </Box>
        }
      />
      {detailsModal && ( // corrected conditional rendering syntax
        <Modal
          onDismiss={closeModal}
          visible={detailsModal}
          closeAriaLabel="Close modal"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={cancelOrder}>
                  Cancel Order
                </Button>
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
                loading={orderLoaded}
              >
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
                <h4>Number of openOrders:</h4>
                {order?.number_of_openOrders}
              </ColumnLayout>
            </HelpPanel>
          </>
        </Modal>
      )}
    </>
  );
}

export default OpenOrders;
