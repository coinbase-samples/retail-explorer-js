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
