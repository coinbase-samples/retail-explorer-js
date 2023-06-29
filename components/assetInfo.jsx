import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AssetContext } from '../context/assetContext';
import { Icons } from '../utils/Icons';
import { TradeForm } from './TradeModal';
import { ReceiveForm } from './ReceiveModal';
import { SendForm } from './SendModal';

import {
  HelpPanel,
  ColumnLayout,
  Button,
  Header,
  Container,
  SpaceBetween,
} from '@cloudscape-design/components';

function AssetInfo({ token }) {
  const { userAsset, assetLoading, getAsset, asset } = useContext(AssetContext);
  const [activeModal, setActiveModal] = React.useState(null);
  const [product, setProduct] = React.useState(0);
  const [initialFetchCompleted, setInitialFetchCompleted] =
    React.useState(false);

  const fetchProduct = async () => {
    const path = `/api/products/${asset}-USD?token=${token}`;
    try {
      const productResponse = await fetch(path);
      const productData = await productResponse.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    if (userAsset !== {}) {
      getAsset(token, asset);

      fetchProduct();
      setInitialFetchCompleted(true);
    }
  }, [asset]);

  const handleModalOpen = (modal) => {
    setActiveModal(modal);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <Container className="assetInfoContainer">
      <HelpPanel
        loading={assetLoading}
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={() => handleModalOpen('trade')}>Trade</Button>
                <Button onClick={() => handleModalOpen('send')}>Send</Button>
                <Button onClick={() => handleModalOpen('receive')}>
                  Receive
                </Button>
              </SpaceBetween>
            }
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
      {activeModal === 'trade' && (
        <TradeForm
          token={token}
          price={product.price}
          open={true}
          close={handleModalClose}
        />
      )}
      {activeModal === 'send' && (
        <SendForm token={token} open={true} close={handleModalClose} />
      )}
      {activeModal === 'receive' && (
        <ReceiveForm token={token} open={true} close={handleModalClose} />
      )}
    </Container>
  );
}

export default AssetInfo;
