import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography } from '@mui/material';
//
import { varFadeInRight, MotionContainer } from './animate';
import { CarouselControlsPaging1, CarouselControlsArrowsBasic1 } from './carousel';

// ----------------------------------------------------------------------

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: '200px',
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const { image, title, linkTo } = item;

  return (
    <RouterLink to={linkTo}>
      <Box sx={{ position: 'relative', height: '300px' }}>
        <Box
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
          }}
        />
        <CarouselImgStyle alt={title} src={image} />
        <CardContent
          sx={{
            bottom: 0,
            width: 1,
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white'
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h5" gutterBottom noWrap>
                {title}
              </Typography>
            </motion.div>
          </MotionContainer>
        </CardContent>
      </Box>
    </RouterLink>
  );
}

AppFeatured.propTypes = {
  posts: PropTypes.array
};

export default function AppFeatured({ posts }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? posts.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto',
        right: 'auto'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {posts.map((post, index) => (
          <CarouselItem key={index} item={post} isActive={post.id === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}
