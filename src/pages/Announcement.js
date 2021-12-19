import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
// material
import { Container, Card, Grid, Box } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// contexts
import { AnnouncementsContext } from '../contexts';
// componenets
import Page from '../components/Page';
import { PostHero } from '../components/post';
import Markdown from '../components/Markdown';

function Announcement() {
  const { themeStretch } = useSettings();
  const { announcementId } = useParams();
  const announcements = useContext(AnnouncementsContext).announcementsState[0];
  const [announcement, setAnnouncement] = useState({});

  useEffect(() => {
    setAnnouncement(_.find(announcements, (o) => o.id === parseInt(announcementId, 10)));
  }, [announcementId, announcements]);

  return (
    <Page title="Announcement">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <PostHero
                post={{
                  cover: announcement?.cover,
                  title: announcement?.title,
                  author: {
                    name: announcement?.created_by_name,
                    avatarUrl: announcement?.created_by_profile_pic
                  },
                  createdAt: announcement?.created_at
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Markdown children={announcement?.body} />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}

export default Announcement;
