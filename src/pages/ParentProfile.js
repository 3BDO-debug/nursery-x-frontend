import React, { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { capitalCase } from 'capital-case';
import { useParams } from 'react-router';
import _ from 'lodash';
// material
import { Container, Box, Stack, Tabs, Tab, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// contexts
import { UsersContext } from '../contexts';
// components
import Page from '../components/Page';
import AccountInfo from '../components/_parent-profile/AccountInfo';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Kids from '../components/_parent-profile/Kids';
import AddKid from '../components/_parent-profile/AddKid';

function ParentProfile() {
  const { parentId } = useParams();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');
  const parents = useContext(UsersContext).parentsState[0];
  const [parent, setParent] = useState({});
  const [addKid, triggerAddKid] = useState(false);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon="codicon:account" width={20} height={20} />,
      component: <AccountInfo parent={parent} />
    },
    { value: 'kids', icon: <Icon icon="tabler:mood-kid" width={20} height={20} />, component: <Kids /> }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (parentId) {
      const parentData = _.find(parents, (o) => o.parent_account === parseInt(parentId, 10));
      setParent(parentData);
    }
  }, [parents, parentId]);

  return (
    <Page title="Parent profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={parent?.parent?.fullname}
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Parent profile', href: '/parent-profile/1' },
            { name: parent?.parent?.fullname }
          ]}
          action={
            <Button onClick={() => triggerAddKid(true)} variant="contained" startIcon={<Icon icon="tabler:mood-kid" />}>
              Add Kid
            </Button>
          }
        />
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
        <AddKid isTriggered={addKid} closeHandler={() => triggerAddKid(false)} />
      </Container>
    </Page>
  );
}

export default ParentProfile;
