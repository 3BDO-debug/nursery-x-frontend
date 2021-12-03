import React, { useState, useEffect, useContext } from 'react';
// material
import { Container, Card } from '@mui/material';
import MUIDataTable from 'mui-datatables';
// hooks
import useSettings from '../hooks/useSettings';
// utils
import { parentsTableColumns, parentsTableData } from '../utils/mock-data/parents';
// contexts
import { UsersContext } from '../contexts';
// routes
import { PATH_APP } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

function Parents() {
  const { themeStretch } = useSettings();
  const parents = useContext(UsersContext).parentsState[0];
  const [parentsData, setParentsData] = useState([]);

  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: false
  };

  useEffect(() => {
    setParentsData(parentsTableData(parents));
  }, [parents]);

  return (
    <Page title="Parents">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Parents"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Parents', href: PATH_APP.dashboard.management.parents }
          ]}
        />
        <Card>
          <MUIDataTable title="Parents list" data={parentsData} columns={parentsTableColumns} options={tableOptions} />
        </Card>
      </Container>
    </Page>
  );
}

export default Parents;
