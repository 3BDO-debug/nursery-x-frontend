import React from 'react';
import PropTypes from 'prop-types';
// material
import { Grid, Card, CardHeader, CardContent, TextField, Button, Typography, CardActions } from '@mui/material';
import { UploadAvatar } from '../upload';
// utils
import { fData } from '../../utils/formatNumber';
// apis
import { mainUrl } from '../../_apis_/axios';

AccountInfo.propTypes = {
  parent: PropTypes.object
};

function AccountInfo({ parent }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card>
          <CardHeader title="Profile picture" />
          <CardContent>
            <UploadAvatar
              caption={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary'
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
              file={`${mainUrl}${parent?.parent?.profile_pic}`}
            />
          </CardContent>
          <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
            <Button>Update</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Card>
          <CardHeader title="Info" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Full name" value={parent?.parent?.fullname} fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Email" fullWidth value={parent?.email} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Phone" fullWidth value={parent?.phone_num} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Address" fullWidth value={parent?.address} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Qualification" fullWidth value={parent?.qualification} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Job" fullWidth value={parent?.job} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button sx={{ float: 'right' }}>Update</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AccountInfo;
