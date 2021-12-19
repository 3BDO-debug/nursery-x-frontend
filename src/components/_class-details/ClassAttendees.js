import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
// material
import { Card, CardHeader, CardContent, Grid, Avatar } from '@mui/material';
// routes
import { PATH_APP } from '../../routes/paths';

ClassAttendees.propTypes = {
  classDetails: PropTypes.object
};

function ClassAttendees({ classDetails }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Attendees" />
      <CardContent>
        <Grid container spacing={3}>
          {classDetails?.class_members_data?.map((classMember) => (
            <Grid key={classMember.id} item xs={12} sm={6} md={3} lg={3}>
              <Avatar
                src={classMember.profile_pic}
                alt={classMember.name}
                sx={{ width: '60px', height: '60px', cursor: 'pointer' }}
                onClick={() => navigate(`${PATH_APP.dashboard.management.kidProfile}/${classMember.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ClassAttendees;
