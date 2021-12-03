import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
// apis
import { classPostsFetcher } from '../../_apis_/classes';
// components
import PostCard from '../postCard/PostCard';
import ClassAttendees from './ClassAttendees';
import CreatePost from './CreatePost';

ClassTimeline.propTypes = {
  classDetails: PropTypes.object
};

function ClassTimeline({ classDetails }) {
  const [classPosts, setClassPosts] = useState([]);

  useEffect(() => {
    if (classDetails?.id) {
      classPostsFetcher(classDetails?.id)
        .then((classPostsResponse) => setClassPosts(classPostsResponse))
        .catch((error) => console.log(error));
    }
  }, [classDetails]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <ClassAttendees classDetails={classDetails} />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8}>
        <CreatePost setClassPosts={setClassPosts} />
        {classPosts?.map((classPost, index) => (
          <PostCard key={index} post={classPost} />
        ))}
      </Grid>
    </Grid>
  );
}

export default ClassTimeline;
