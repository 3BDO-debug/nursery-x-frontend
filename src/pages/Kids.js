import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
// material
import { Card, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// context
import { AuthContext, KidsContext } from '../contexts';
// utils
import { kidsTableColumns, kidsTableData } from '../utils/mock-data/kids';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

function Kids() {
  const user = useContext(AuthContext).userState[0];
  const { themeStretch } = useSettings();
  const kids = useContext(KidsContext).kidsState[0];
  const [kidsTableRows, setKidsTableRows] = useState([]);

  useEffect(() => {
    if (user?.account_type === 'parent') {
      const parentKids = _.filter(kids, (o) => o.parent_id === user?.id);
      setKidsTableRows(kidsTableData(parentKids));
    } else {
      setKidsTableRows(kidsTableData(kids));
    }
  }, [kids, user]);

  return (
    <Page title="Kids">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Kids"
          links={[
            { name: 'Dashboard', href: PATH_APP.dashboard.management.kids },
            { name: 'Kids', href: PATH_APP.dashboard.management.kids }
          ]}
        />

        <Card>
          <MUIDataTable
            title="Kids list"
            data={kidsTableRows}
            columns={kidsTableColumns}
            options={{
              filterType: 'checkbox',
              selectableRows: false
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default Kids;
