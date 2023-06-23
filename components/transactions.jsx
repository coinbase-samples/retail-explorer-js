import React, { useContext, useEffect, useState } from "react";
import { Table, Box } from "@cloudscape-design/components";
import { TransactionsContext } from "../context/transactionsContext";

function Transactions(props) {
  const {
    transactions,
    transactionsLoading: transactionsLoaded,
    getTransactions,
  } = useContext(TransactionsContext);

  const { token, asset } = props;

  useEffect(() => {
    if (transactions !== []) {
      console.log("calling transactions context", asset);
      getTransactions(token, asset);
    }
  }, [asset]); // useEffect now depends on userOpenOrders

  return (
    <>
      <Table
        resizableColumns={true}
        trackBy="id"
        sortingDescending
        variant="container"
        columnDefinitions={[
          {
            id: "id",
            header: "Transaction Id",
            cell: (e) => e.id,
            width: 250,
            minWidth: 150,
            sortingField: "id",
          },
          {
            id: "type",
            header: "Type",
            cell: (e) => e.type,
            width: 130,
            minWidth: 130,
            sortingField: "type",
          },
          {
            id: "status",
            header: "Status",
            cell: (e) => e.status,
            width: 135,
            minWidth: 135,
            sortingField: "status",
          },
          {
            id: "created_at",
            header: "Order Date",
            cell: (e) => e.created_at,
            width: 150,
            minWidth: 150,
            sortingField: "created_at",
          },
          {
            id: "currency",
            header: "Currency",
            cell: (e) => e.native_amount.currency,
            width: 150,
            minWidth: 150,
          },
        ]}
        items={transactions}
        loading={transactionsLoaded}
        loadingText="Loading transactions..."
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Transactions Found</b>
          </Box>
        }
      />
    </>
  );
}

export default Transactions;
