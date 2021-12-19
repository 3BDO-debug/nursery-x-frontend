import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
// material
import MUIDataTable from 'mui-datatables';
import { Stack, Typography, Avatar, Rating, Link } from '@mui/material';
// routes
import { PATH_APP } from '../../../routes/paths';

FollowUp.propTypes = {
  activitiesRatingsData: PropTypes.array
};

function FollowUp({ activitiesRatingsData }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'teacher',
      label: 'Teacher',
      options: {
        customBodyRender: (value) => (
          <Stack direction="row" alignItems="center">
            <Avatar src={value.teacherProfilePic} />
            <Typography sx={{ marginLeft: '10px' }} variant="subtitle2">
              {value.teacherName}
            </Typography>
          </Stack>
        )
      }
    },
    {
      name: 'activityClass',
      label: 'Class',
      options: {
        customBodyRender: (value) => (
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate(`${PATH_APP.dashboard.management.classDetails}/${value.classId}`)}
          >
            {value.className}
          </Link>
        )
      }
    },
    { name: 'activity', label: 'Activity' },
    { name: 'rating', label: 'Rating', options: { customBodyRender: (value) => <Rating value={value} readOnly /> } },
    {
      name: 'notes',
      label: 'Notes',
      options: { customBodyRender: (value) => <Typography variant="body1">{value}</Typography> }
    }
  ];

  const [activitiesRatingsRows, setActivitiesRatingRows] = useState([]);

  useEffect(() => {
    const activitiesRatings = activitiesRatingsData.map((activityRating) => ({
      teacher: { teacherName: activityRating.teacher_name, teacherProfilePic: activityRating.teacher_profile_pic },
      activityClass: { className: activityRating.activity_class_name, classId: activityRating.activity_class },
      activity: activityRating.activity_name,
      rating: activityRating.rating,
      notes: activityRating.notes
    }));

    setActivitiesRatingRows(activitiesRatings);
  }, [activitiesRatingsData]);

  return (
    <MUIDataTable options={{ selectableRowsHideCheckboxes: true }} columns={columns} data={activitiesRatingsRows} />
  );
}

export default FollowUp;
