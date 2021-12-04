import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// material
import { Grid } from '@mui/material';
// contexts
import { ClassesContext } from '../../../contexts';
// apis
import { mainUrl } from '../../../_apis_/axios';
// routes
import { PATH_APP } from '../../../routes/paths';
// components
import PostCard from '../../post/PostCard';

// ----------------------------------------------------------------------

KidClasses.propTypes = {};

export default function KidClasses() {
  const { kidId } = useParams();

  const classes = useContext(ClassesContext).classesState[0];

  const [kidClasses, setKidClasses] = useState([]);

  useEffect(() => {
    if (kidId) {
      classes.map(
        (activityClass) =>
          activityClass.class_members.includes(parseInt(kidId, 10)) &&
          setKidClasses((prevClasses) => [...prevClasses, activityClass])
      );
    }
  }, [kidId, classes]);

  return (
    <Grid container spacing={3}>
      {kidClasses.map((activityClass) => (
        <Grid key={activityClass.id} item xs={12} sm={6} md={4} lg={4}>
          <PostCard
            key={activityClass.id}
            post={{
              id: activityClass.id,
              cover: `${mainUrl}${activityClass.class_cover}`,
              title: activityClass.class_name,
              audience: activityClass.class_members.length,
              authorName: activityClass.teacher_name,
              authorAvatar: `${mainUrl}/${activityClass.teacher_profile_pic}`,
              createdAt: new Date(activityClass.created_at).toLocaleString(),
              linkTo: `${PATH_APP.dashboard.management.classDetails}/${activityClass.id}`
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
