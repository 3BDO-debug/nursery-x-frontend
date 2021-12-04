import { Link } from 'react-router-dom';
// material
import { Stack, Avatar, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// apis
import { mainUrl } from '../../_apis_/axios';
// routes
import { PATH_APP } from '../../routes/paths';

export const parentsTableColumns = [
  {
    name: 'parentName',
    label: 'Parent name',
    options: {
      customBodyRender: (value) => (
        <Stack direction="row" alignItems="center">
          <Avatar src={`${mainUrl}${value.profile_pic}`} alt={value.fullname} />
          <Typography sx={{ marginLeft: '10px' }} variant="subtitle1">
            {value.fullname}
          </Typography>
        </Stack>
      )
    }
  },
  { name: 'job', label: 'Job' },
  { name: 'qualification', label: 'Qualification' },
  {
    name: 'action',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <IconButton component={Link} to={`${PATH_APP.dashboard.management.parentProfile}/${value}`}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  }
];

export const parentsTableData = (parents) => {
  const parentsData = parents.map((parent) => ({
    parentName: parent.parent,
    job: parent.job,
    qualification: parent.qualification,
    action: parent.parent_account
  }));
  return parentsData;
};
