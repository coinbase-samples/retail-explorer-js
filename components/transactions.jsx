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
import { Table, Box } from '@cloudscape-design/components';
import { TransactionsContext } from '../context/transactionsContext';

function Transactions(props) {
  const {
    transactions,
    transactionsLoading: transactionsLoaded,
    getTransactions,
  } = useContext(TransactionsContext);

  const { token, asset } = props;

  useEffect(() => {
    if (transactions !== []) {
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
            id: 'id',
            header: 'Transaction Id',
            cell: (e) => e.id,
            width: 250,
            minWidth: 150,
            sortingField: 'id',
          },
          {
            id: 'type',
            header: 'Type',
            cell: (e) => e.type,
            width: 130,
            minWidth: 130,
            sortingField: 'type',
          },
          {
            id: 'status',
            header: 'Status',
            cell: (e) => e.status,
            width: 135,
            minWidth: 135,
            sortingField: 'status',
          },
          {
            id: 'created_at',
            header: 'Order Date',
            cell: (e) => e.created_at,
            width: 150,
            minWidth: 150,
            sortingField: 'created_at',
          },
          {
            id: 'currency',
            header: 'Currency',
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
