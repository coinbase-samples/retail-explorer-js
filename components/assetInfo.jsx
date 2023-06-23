import * as React from "react";
import { useContext, useEffect } from "react";
import { AssetContext } from "../context/assetContext";
import { OrdersContext } from "../context/ordersContext";
import { Icons } from "../utils/Icons";
import { TradeForm } from "./TradeModal";
import { ReceiveForm } from "./ReceiveModal";
import { SendForm } from "./SendModal";

import {
  HelpPanel,
  ColumnLayout,
  Button,
  ButtonGroup,
  Box,
  Header,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";

function AssetInfo(props) {
  const {
    userAsset,
    assetLoading: assetLoaded,
    getAsset,
    asset,
  } = useContext(AssetContext);

  const token = props.token;
  const closeTradeModal = () => {
    setTradeModal(false);
    setReceiveModal(false);
    setSendModal(false);
  };

  const [tradeModal, setTradeModal] = React.useState(false);
  const [receiveModal, setReceiveModal] = React.useState(false);
  const [sendModal, setSendModal] = React.useState(false);

  const [product, setProduct] = React.useState(0);

  const [initialFetchCompleted, setInitialFetchCompleted] =
    React.useState(false);

  const fetchProduct = async () => {
    const path = `/api/products/${asset}-USD?token=${token}`;
    try {
      const productResponse = await fetch(path, {
        method: "GET",
      });
      const productData = await productResponse.json();
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (userAsset !== {}) {
      getAsset(token, asset);

      fetchProduct();
      setInitialFetchCompleted(true);
    }
  }, [asset]);

  const handleSend = () => {
    setSendModal(true);
    // code to execute the 'transfer' action
  };

  const handleReceive = () => {
    setReceiveModal(true);
    // code to execute the 'transfer' action
  };

  const handleTrade = () => {
    setTradeModal(true);
  };

  return (
    <Container className="assetInfoContainer">
      <HelpPanel
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={handleTrade}>Trade</Button>
                <Button onClick={handleSend}>Send</Button>
                <Button onClick={handleReceive}>Receive</Button>
              </SpaceBetween>
            }
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icons asset={userAsset?.currency} /> {userAsset?.currency} Wallet
              Info
            </div>
          </Header>
        }
      >
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Name:</h4>
          {userAsset?.name}
          <h4>Last Price:</h4>
          {product.price}
          <h4>ID:</h4>
          {userAsset?.id}
          <h4>Holds:</h4>
          {userAsset?.balance?.amount}
          <h4>USD value:</h4>
          {userAsset?.native_balance?.amount}
        </ColumnLayout>
      </HelpPanel>
      {tradeModal ? (
        <TradeForm
          token={token}
          price={product.price}
          open={tradeModal}
          close={closeTradeModal}
        />
      ) : null}

      {receiveModal ? (
        <ReceiveForm
          token={token}
          open={receiveModal}
          close={closeTradeModal}
        />
      ) : null}

      {sendModal ? (
        <SendForm token={token} open={sendModal} close={closeTradeModal} />
      ) : null}
    </Container>
  );
}

export default AssetInfo;
