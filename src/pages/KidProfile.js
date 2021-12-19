import React, { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { useParams } from 'react-router';
import _ from 'lodash';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// apis
import { mainUrl } from '../_apis_/axios';
import { classActivityRatingsFetcher } from '../_apis_/classes';
// contexts
import { KidsContext } from '../contexts';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import ParentsInfo from '../components/_kid-profile/parents/ParentsInfo';
import { KidClasses } from '../components/_kid-profile/classes';
import FollowUp from '../components/_kid-profile/followUp/FollowUp';
import Cover from '../components/Cover';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function KidProfile() {
  const { kidId } = useParams();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('classes');

  const kids = useContext(KidsContext).kidsState[0];

  const [kid, setKid] = useState({});
  const [activitiesRatings, setActivitiesRating] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: 'classes',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <KidClasses />
    },
    {
      value: 'parents',
      icon: <Icon icon="carbon:pedestrian-family" width={20} height={20} />,
      component: <ParentsInfo kid={kid} />
    },
    {
      value: 'followup',
      icon: <Icon icon="gridicons:reader-following" width={20} height={20} />,
      component: <FollowUp activitiesRatingsData={activitiesRatings} />
    }
  ];

  useEffect(() => {
    if (kidId) {
      setKid(_.find(kids, (o) => o.id === parseInt(kidId, 10)));
    }
  }, [kidId, kids]);

  useEffect(() => {
    if (kid?.id) {
      classActivityRatingsFetcher(kid?.id)
        .then((activitiesRatingsResponse) => setActivitiesRating(activitiesRatingsResponse))
        .catch((error) => console.log(`Couldn't fetch ratings - ${error}`));
    }
  }, [kid]);

  return (
    <Page title="Kid Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={kid?.name}
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Kids', href: PATH_APP.dashboard.management.kids },
            { name: kid?.name }
          ]}
          action={
            <Button
              onClick={() => window.open(`${mainUrl}${kid?.attachment}`)}
              startIcon={<Icon icon="carbon:document" />}
              variant="contained"
            >
              Attachment
            </Button>
          }
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <Cover data={{ cover: kid?.profile_pic, name: kid?.name, createdAt: kid?.birth_date }} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

export default KidProfile;
