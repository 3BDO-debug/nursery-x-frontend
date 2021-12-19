import { Icon } from '@iconify/react';
import { useRef, useState, useContext } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
// material
import { alpha } from '@mui/material/styles';
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// context
import { AuthContext } from '../../contexts';
// apis
import { logoutRequest } from '../../_apis_/auth';
// routes
import { PATH_APP } from '../../routes/paths';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';

export default function AccountPopover() {
  const user = useContext(AuthContext).userState[0];
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const MENU_OPTIONS = [
    { label: 'Home', icon: homeFill, linkTo: '/' },
    {
      label: 'Profile',
      icon: personFill,
      linkTo:
        user?.account_type === 'staff-member'
          ? `${PATH_APP.dashboard.management.staffMember}/${user?.id}`
          : `${PATH_APP.dashboard.management.parentProfile}/${user?.id}`
    }
    /*   { label: 'Settings', icon: settings2Fill, linkTo: '#' }
     */
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () =>
    logoutRequest()
      .then(() => {
        navigate('/auth/login');
        enqueueSnackbar('Looged out', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch(() =>
        enqueueSnackbar('Something wrong happened', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar alt="My Avatar" src={user?.profile_pic} />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {`${user?.first_name} ${user?.last_name}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
