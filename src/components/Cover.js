import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
//
import MyAvatar from './MyAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

const CoverImgStyle = styled('img')({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

Cover.propTypes = {
  data: PropTypes.object
};

function Cover({ data }) {
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
          cover={data?.cover}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{data?.name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{new Date(data?.createdAt).toLocaleString()}</Typography>
        </Box>
      </InfoStyle>
      <CoverImgStyle
        alt="profile cover"
        src="https://images.unsplash.com/photo-1541363111435-5c1b7d867904?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
      />
    </RootStyle>
  );
}

export default Cover;
