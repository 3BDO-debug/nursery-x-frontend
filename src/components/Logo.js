import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 90, height: 90, ...sx }}>
      <Box component="img" src="/static/brand/logo.png" />
    </Box>
  );
}
