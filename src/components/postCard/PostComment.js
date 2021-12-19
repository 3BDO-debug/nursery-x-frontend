import React from 'react';
import PropTypes from 'prop-types';
// material
import { Paper, Avatar, Typography } from '@mui/material';
// components

PostComment.propTypes = {
  comment: PropTypes.object
};

function PostComment({ comment }) {
  return (
    <Paper sx={{ display: 'flex', alignItems: 'flex-start', p: 2, width: '100%' }}>
      <Avatar src={comment.created_by_profile_pic} sx={{ marginRight: '15px' }} />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(145, 158, 171, 0.16)',
          p: 2,
          width: '100%'
        }}
      >
        <Typography variant="subtitle1">{comment.created_by_name}</Typography>
        <Typography variant="caption">{new Date(comment.created_at).toLocaleString()}</Typography>
        <Typography sx={{ paddingTop: 2 }} variant="body2">
          {comment.comment}
        </Typography>
      </Paper>
    </Paper>
  );
}

export default PostComment;
