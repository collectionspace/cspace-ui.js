import { connect } from 'react-redux';
import RelatedRecordBrowser from '../../components/record/RelatedRecordBrowser';

import {
  setRelatedRecordBrowserRelatedCsid,
} from '../../actions/recordBrowser';

import {
  deselectResultItem,
} from '../../actions/search';

import {
  getRelatedRecordBrowserRelatedCsid,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    relatedRecordType,
  } = ownProps;

  return {
    perms: getUserPerms(state),
    preferredRelatedCsid: getRelatedRecordBrowserRelatedCsid(state, relatedRecordType),
  };
};

const mapDispatchToProps = {
  deselectItem: deselectResultItem,
  setPreferredRelatedCsid: setRelatedRecordBrowserRelatedCsid,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelatedRecordBrowser);
