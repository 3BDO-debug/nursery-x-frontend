import React from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Avatar, Typography, Link } from '@mui/material';

Contact.propTypes = {
  avatarUrl: PropTypes.string,
  fullname: PropTypes.string,
  onClickHandler: PropTypes.func
};

function Contact({ avatarUrl, fullname, onClickHandler }) {
  return (
    <Link component="button" onClick={onClickHandler}>
      <Stack direction="row" alignItems="center" marginBottom={3} sx={{ cursor: 'pointer' }}>
        <Avatar src={avatarUrl} alt={fullname} sx={{ marginRight: 2 }} />
        <Typography variant="subtitle2">{fullname}</Typography>
      </Stack>
    </Link>
  );
}

export default Contact;
