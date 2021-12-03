import PropTypes from 'prop-types';
// apis
import { mainUrl } from '../_apis_/axios';
//
import { MAvatar } from './@material-extend';

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  cover: PropTypes.any
};

export default function MyAvatar({ cover, ...other }) {
  return (
    <MAvatar src={`${mainUrl}/${cover}`} alt={cover} color={cover ? 'default' : 'Class'} {...other}>
      dsadsa
    </MAvatar>
  );
}
