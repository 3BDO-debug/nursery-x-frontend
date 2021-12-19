import { Link } from 'react-router-dom';
// material
import { Typography, Avatar, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// routes
import { PATH_APP } from '../../routes/paths';

export const kidsTableColumns = [
  {
    name: 'kidName',
    label: 'Kid name',
    options: { customBodyRender: (value) => <Typography variant="subtitle2">{value}</Typography> }
  },
  {
    name: 'kidPhoto',
    label: 'Kid photo',
    options: { customBodyRender: (value) => <Avatar src={value} alt={value} /> }
  },
  { name: 'birthDate', label: 'Birth date' },
  {
    name: 'action',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <IconButton component={Link} to={`${PATH_APP.dashboard.management.kidProfile}/${value}`}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  }
];

export const kidsTableData = (kids) => {
  const kidsData = kids.map((kid) => ({
    kidName: kid.name,
    kidPhoto: kid.profile_pic,
    birthDate: new Date(kid.birth_date).toLocaleDateString(),
    action: kid.id
  }));

  return kidsData;
};
