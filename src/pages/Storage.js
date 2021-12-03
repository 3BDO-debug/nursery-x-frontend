import React from 'react';
// material
import { Card, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

function Storage() {
  const { themeStretch } = useSettings();
  const columns = ['Name', 'Company', 'City', 'State'];

  const data = [
    ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
    ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
    ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
    ['James Houston', 'Test Corp', 'Dallas', 'TX']
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: false
  };

  return (
    <Page title="Storage">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Storage"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Storage', href: PATH_APP.dashboard.resources.storage }
          ]}
        />
        <Card>
          <MUIDataTable title="Items list" data={data} columns={columns} options={options} />
        </Card>
      </Container>
    </Page>
  );
}

export default Storage;
