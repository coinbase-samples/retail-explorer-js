import {
  Container,
  Grid,
  Header,
  Button,
  Tabs,
} from '@cloudscape-design/components';
import { useContext, useEffect, useState } from 'react'; // Import useState
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts';
import { gridDefinition } from '../utils/grids';
import Profile from '../components/profile';
import Orders from '../components/orders';
import OpenOrders from '../components/openOrders';
import AssetInfo from '../components/assetInfo';
import Transactions from '../components/transactions';
import { AssetSwitcher } from '../components/assetSwitcher';
import { AssetContext } from '../context/assetContext';

export function Landing() {
  const router = useRouter();
  const [assetModal, setAssetModal] = useState(false);
  const { authToken } = useContext(UserContext);
  const { query } = router;
  const { asset } = useContext(AssetContext); // Retrieve asset from AssetContext
  const token = query.token;

  useEffect(() => {
    if (asset === '') {
      setAssetModal(true);
    }
  }, [asset]);

  const closeAssetModal = () => {
    setAssetModal(false);
  };

  let assetSwitcherComponent = null;

  if (asset === '' || assetModal) {
    assetSwitcherComponent = (
      <AssetSwitcher token={token} open={assetModal} close={closeAssetModal} />
    );
  }

  return (
    <Layout>
      <Button onClick={() => setAssetModal(true)}>Switch Asset</Button>
      <Grid id="homeDashboard" gridDefinition={gridDefinition}>
        {assetSwitcherComponent}
        <>
          <AssetInfo token={token} />

          <Container
            className="profileContentt"
            // loading={balanceLoaded}
            loadingText="Fetching Profile..."
          >
            <Profile token={token} />
          </Container>
          <Container
            className="resourcesContainer"
            header={<Header variant="h2">Resources</Header>}
          >
            <Tabs
              tabs={[
                {
                  label: 'Filled Orders',
                  id: 'filled',
                  content: asset !== '' ? <Orders token={token} /> : null,
                },
                {
                  label: 'Open Orders',
                  id: 'open',
                  content: asset !== '' ? <OpenOrders token={token} /> : null,
                },
                {
                  label: 'Transactions',
                  id: 'transactions',
                  content:
                    asset !== '' ? (
                      <Transactions token={token} asset={asset} />
                    ) : null,
                },
              ]}
            />
          </Container>
        </>
      </Grid>
    </Layout>
  );
}

export default Landing;
