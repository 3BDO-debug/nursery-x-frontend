import PropTypes from 'prop-types';
//
import { MAvatar } from './@material-extend';

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  cover: PropTypes.any
};

export default function MyAvatar({ cover, ...other }) {
  return (
    <MAvatar src={cover} alt={cover} color={cover ? 'default' : 'Class'} {...other}>
      avatar
    </MAvatar>
  );
}
