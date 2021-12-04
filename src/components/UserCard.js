import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Avatar, Divider, Typography } from '@mui/material';
// apis
import { mainUrl } from '../_apis_/axios';
// routes
import { PATH_APP } from '../routes/paths';
//
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default function UserCard({ user, ...other }) {
  const navigate = useNavigate();

  return (
    <Card
      {...other}
      sx={{ padding: 2, cursor: 'pointer' }}
      onClick={() => navigate(`${PATH_APP.dashboard.management.kidProfile}/${user?.id}`)}
    >
      <CardMediaStyle>
        <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute'
          }}
        />
        <Avatar
          alt={user?.name}
          src={`${mainUrl}${user?.profile_pic}`}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        />
        <CoverImgStyle
          alt="cover"
          src="https://images.unsplash.com/photo-1541363111435-5c1b7d867904?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {user?.name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {new Date(user?.birth_date).toLocaleString()}
      </Typography>

      <Divider />
    </Card>
  );
}
