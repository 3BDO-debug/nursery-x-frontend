import React from 'react';
// material
import { Card, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// componenets
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Contacts from '../components/_messenger/Contacts';
import Chat from '../components/_messenger/Chat';

function Messenger() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Nursery-X:Messenger">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Messenger"
          links={[{ name: 'Dashboard', href: PATH_APP.root }, { name: 'Messenger' }]}
        />
        <Card sx={{ padding: 3 }}>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Contacts />
            <Chat />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

export default Messenger;
