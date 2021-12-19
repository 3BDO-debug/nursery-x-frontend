import { Icon } from '@iconify/react';
// material
import { Avatar, Button } from '@mui/material';

export const activitiesTableColumns = (setTriggeredActivity, triggerRateKids) => [
  { name: 'activity', label: 'Activity' },
  {
    name: 'activityImg',
    label: 'Activity image',
    options: {
      customBodyRender: (value) => <Avatar variant="rounded" sx={{ width: '200px', height: '200px' }} src={value} />
    }
  },
  { name: 'startsAt', label: 'Starts at' },
  {
    name: 'action',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <Button
          onClick={() => {
            setTriggeredActivity(value);
            triggerRateKids(true);
          }}
          startIcon={<Icon icon="ic:baseline-star-rate" />}
          variant="contained"
        >
          Rate kids
        </Button>
      )
    }
  }
];

export const activitiesTableData = (activities) => {
  const activitiesData = activities.map((activity) => ({
    activity: activity.activity,
    activityImg: activity.activity_img,
    startsAt: activity.starts_at,
    action: activity
  }));

  return activitiesData;
};
