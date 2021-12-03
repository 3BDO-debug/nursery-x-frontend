import React, { useContext, useEffect, useState } from 'react';
// material
import { Container, Card } from '@mui/material';
import MUIDataTable from 'mui-datatables';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// utils
import { staffTableColumns, staffTableData } from '../utils/mock-data/staff';
// contexts
import { UsersContext } from '../contexts';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

function Staff() {
  const { themeStretch } = useSettings();
  const staff = useContext(UsersContext).staffState[0];
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(staffTableData(staff));
  }, [staff]);

  const tableOptions = {
    filterType: 'checkbox',
    selectableRows: false
  };

  return (
    <Page title="Staff">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Staff"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Staff', href: PATH_APP.dashboard.management.staff }
          ]}
        />

        <Card>
          <MUIDataTable title="Staff list" data={staffData} columns={staffTableColumns} options={tableOptions} />
        </Card>
      </Container>
    </Page>
  );
}

export default Staff;
