import React, { useState, useContext, useEffect } from 'react';
// material
import { Container, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// hooks
import useSettings from '../hooks/useSettings';
// contexts
import { AuthContext, ClassesContext } from '../contexts';
// apis
import { mainUrl } from '../_apis_/axios';
// routes
import { PATH_APP } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import PostCard from '../components/post/PostCard';
import CreateClass from '../components/_classes/CreateClass';

function Classes() {
  const user = useContext(AuthContext).userState[0];
  const { themeStretch } = useSettings();
  const [createClass, triggerCreateClass] = useState(false);
  const classes = useContext(ClassesContext).classesState[0];
  const [mappedClasses, setMappedClasses] = useState([]);

  useEffect(() => {
    if (user?.account_type === 'parent') {
      classes.forEach((activityClass) => {
        activityClass.class_members_data.forEach((classMember) => {
          if (classMember.parent_id === user?.id) {
            setMappedClasses((prevClasses) => [...prevClasses, activityClass]);
          }
        });
      });
    } else {
      setMappedClasses(classes);
    }
  }, [user, classes]);

  return (
    <Page title="Classes">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Classes"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Classes', href: PATH_APP.dashboard.management.classes }
          ]}
          action={
            user?.account_type !== 'parent' && (
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => triggerCreateClass(true)}>
                Create new class
              </Button>
            )
          }
        />
        <Grid container spacing={3}>
          {mappedClasses.map((activityClass) => (
            <Grid key={activityClass.id} item xs={12} sm={12} md={6} lg={4}>
              <PostCard
                key={activityClass.id}
                post={{
                  id: activityClass.id,
                  cover: `${mainUrl}${activityClass.class_cover}`,
                  title: activityClass.class_name,
                  audience: activityClass.class_members.length,
                  authorName: activityClass.teacher_name,
                  authorAvatar: `${mainUrl}${activityClass.teacher_profile_pic}`,
                  createdAt: new Date(activityClass.created_at).toLocaleString(),
                  linkTo: `${PATH_APP.dashboard.management.classDetails}/${activityClass.id}`
                }}
              />
            </Grid>
          ))}
        </Grid>
        <CreateClass isTriggered={createClass} closeHandler={() => triggerCreateClass(false)} />
      </Container>
    </Page>
  );
}

export default Classes;
