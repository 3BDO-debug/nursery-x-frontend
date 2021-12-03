import React from 'react';
import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent, Grid, TextField } from '@mui/material';

ParentsInfo.propTypes = {
  kid: PropTypes.object
};

function ParentsInfo({ kid }) {
  return (
    <Card>
      <CardHeader title="Parents info" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_name} label="Full name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_email} label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_phone} label="Phone" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_address} label="Address" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_qualification} label="Qualification" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField value={kid?.parent_job} label="Job" fullWidth />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ParentsInfo;
