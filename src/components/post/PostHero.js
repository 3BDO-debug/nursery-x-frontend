import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 480,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    paddingTop: 'calc(100% * 9 / 16)'
  },
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.72)
  }
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
  }
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3)
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10)
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

PostHero.propTypes = {
  post: PropTypes.object.isRequired
};

export default function PostHero({ post, ...other }) {
  const { cover, title, author, createdAt } = post;

  return (
    <RootStyle {...other}>
      <CoverImgStyle alt="post cover" src={cover} />

      <TitleStyle variant="h2" component="h1">
        {title}
      </TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={author.name} src={author.avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {author.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {createdAt}
            </Typography>
          </Box>
        </Box>
      </FooterStyle>
    </RootStyle>
  );
}
