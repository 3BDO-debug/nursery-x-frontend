import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Avatar, Paper, Typography } from '@mui/material';
// apis
import { mainUrl } from '../../_apis_/axios';
// components

SearchResult.propTypes = {
  result: PropTypes.object
};

function SearchResult({ result }) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={`${mainUrl}/${result?.profile_pic}`} sx={{ marginRight: 2 }} />
      <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2">{result?.name}</Typography>
        <Typography variant="caption">{new Date(result?.birth_date).toLocaleDateString()}</Typography>
      </Paper>
    </Box>
  );
}

export default SearchResult;
