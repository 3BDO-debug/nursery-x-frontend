import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from '../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  noAudience: PropTypes.bool
};

export default function PostCard({ post, index, noAudience }) {
  const { cover, title, audience, authorName, authorAvatar, createdAt, linkTo } = post;
  const latestPostLarge = true;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: audience, icon: <Icon icon="fluent:people-audience-20-filled" width={20} height={20} /> }
  ];

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMediaStyle
        sx={{
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)'
            }
          })
        }}
      >
        <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            ...((latestPostLarge || latestPost) && { display: 'none' })
          }}
        />
        <AvatarStyle
          alt={authorName}
          src={authorAvatar}
          sx={{
            ...((latestPostLarge || latestPost) && {
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40
            })
          }}
        />

        <CoverImgStyle alt={title} src={cover} />
      </CardMediaStyle>

      <CardContent
        sx={{
          pt: 4,
          ...((latestPostLarge || latestPost) && {
            bottom: 0,
            width: '100%',
            position: 'absolute'
          })
        }}
      >
        <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
          {createdAt}
        </Typography>

        <TitleStyle
          to={linkTo}
          sx={{
            ...(latestPostLarge && { typography: 'h5', height: 60 }),
            ...((latestPostLarge || latestPost) && {
              color: 'common.white'
            })
          }}
        >
          {title}
        </TitleStyle>

        {!noAudience && (
          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                {info.icon}
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        )}
      </CardContent>
    </Card>
  );
}
