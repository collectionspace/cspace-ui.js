import { connect } from 'react-redux';
import Image from '../../components/media/Image';

import {
  readBinary,
} from '../../actions/media';

const mapDispatchToProps = {
  readImage: readBinary,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Image);
