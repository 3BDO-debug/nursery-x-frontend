import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
// material
import { Container, Grid, Card, CardContent, Typography, CardHeader, TextField, Stack } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// context
import { UsersContext } from '../contexts';
// apis
import { mainUrl } from '../_apis_/axios';
// utils
import { fData } from '../utils/formatNumber';
// componenets
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { UploadAvatar } from '../components/upload';
import Label from '../components/Label';

function StaffMember() {
  const { themeStretch } = useSettings();
  const { staffMemberId } = useParams();

  const staff = useContext(UsersContext).staffState[0];
  const [staffMember, setStaffMember] = useState({});

  useEffect(() => {
    if (staffMemberId) {
      setStaffMember(_.find(staff, (o) => o.staff_account === parseInt(staffMemberId, 10)));
    }
  }, [staffMemberId, staff]);

  return (
    <Page title="Staff member">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={staffMember?.fullname}
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Staff', href: PATH_APP.dashboard.management.staff },
            { name: staffMember?.fullname }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                file={`${mainUrl}${staffMember?.profile_pic}`}
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
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card>
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                    <Typography variant="subtitle1">Info</Typography>
                    <Label sx={{ marginLeft: 'auto', order: '2' }} variant="ghost" color="primary">
                      {staffMember?.role}
                    </Label>
                  </Stack>
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField value={staffMember?.fullname} label="Fullname" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField value={staffMember?.email} label="Email" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField value={staffMember?.phone_num} label="Phone number" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField value={staffMember?.address} label="Address" fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default StaffMember;
