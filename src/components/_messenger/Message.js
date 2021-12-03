import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Stack, Avatar, Typography, Paper } from '@mui/material';

Message.propTypes = {
  avatarUrl: PropTypes.string,
  timestamp: PropTypes.any,
  body: PropTypes.string,
  senderView: PropTypes.bool
};

function Message({ avatarUrl, timestamp, body, senderView }) {
  return (
    <Paper sx={{ margin: 2 }}>
      <Stack direction="row">
        {!senderView && <Avatar sx={{ marginRight: 1 }} src={avatarUrl} />}
        <Stack direction="column" sx={{ marginLeft: senderView ? 'auto' : 'none' }}>
          <Typography variant="caption">{timestamp}</Typography>
          <Box borderRadius={1} bgcolor="rgba(145, 158, 171, 0.16)" padding={2}>
            <Typography variant="body2">{body}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Message;
