import React, { useContext, useState } from 'react';
// material
import { Container, Grid, Fab, Skeleton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
// hooks
import useSettings from '../hooks/useSettings';
// context
import { AuthContext, AnnouncementsContext } from '../contexts';
// apis
import { mainUrl } from '../_apis_/axios';
// routes
import { PATH_APP } from '../routes/paths';
// components
import Page from '../components/Page';
import AppWelcome from '../components/AppWelcome';
import AppFeatured from '../components/AppFeatured';
import PostCard from '../components/post/PostCard';
import CreateAnnouncement from '../components/_overview/CreateAnnouncement';

function Overview() {
  const { themeStretch } = useSettings();
  const user = useContext(AuthContext).userState[0];
  const announcements = useContext(AnnouncementsContext).announcementsState[0];

  const [createAnnouncement, triggerCreateAnnouncement] = useState(false);

  return (
    <Page title="Overview">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            {user ? (
              <AppWelcome displayName={`${user?.first_name} ${user?.last_name}`} />
            ) : (
              <Skeleton sx={{ height: '100%' }} />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <AppFeatured
              posts={announcements.map((announcement, index) => ({
                id: index,
                title: announcement.title,
                image: `${mainUrl}/${announcement.cover}`,
                linkTo: `${PATH_APP.announcement}/${announcement.id}`
              }))}
            />
          </Grid>
          {announcements.map((announcement) => (
            <Grid key={announcement.id} item xs={12} sm={12} md={6} lg={6}>
              <PostCard
                post={{
                  id: announcement.id,
                  cover: `${mainUrl}/${announcement.cover}`,
                  title: announcement.title,
                  authorName: announcement.created_by_name,
                  authorAvatar: `${mainUrl}/${announcement.created_by_profile_pic}`,
                  createdAt: new Date(announcement.created_at).toLocaleDateString(),
                  linkTo: `${PATH_APP.announcement}/${announcement.id}`
                }}
                noAudience
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {user && !createAnnouncement && !user.account_type === 'parent' && (
        <Fab
          onClick={() => triggerCreateAnnouncement(true)}
          variant="extended"
          sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '10000' }}
        >
          <CreateIcon />
          Create announcement
        </Fab>
      )}
      <CreateAnnouncement isTriggered={createAnnouncement} closeHandler={() => triggerCreateAnnouncement(false)} />
    </Page>
  );
}

export default Overview;
