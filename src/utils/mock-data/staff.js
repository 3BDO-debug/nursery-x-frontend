import { Link } from 'react-router-dom';
// material
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// routes
import { PATH_APP } from '../../routes/paths';
// components
import Label from '../../components/Label';

export const staffTableColumns = [
  { name: 'fullname', label: 'Full name' },
  {
    name: 'role',
    label: 'role',
    options: {
      customBodyRender: (value) => (
        <Label variant="ghost" color="info">
          {value}
        </Label>
      )
    }
  },
  { name: 'joinedAt', label: 'Joined at' },
  {
    name: 'action',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <IconButton component={Link} to={`${PATH_APP.dashboard.management.staffMember}/${value}`}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  }
];

export const staffTableData = (staff) => {
  const staffData = staff.map((staffMember) => ({
    fullname: staffMember.fullname,
    role: staffMember.role,
    joinedAt: new Date(staffMember.date_joined).toLocaleString(),
    action: staffMember.staff_account
  }));

  return staffData;
};
