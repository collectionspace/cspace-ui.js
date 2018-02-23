import { connect } from 'react-redux';
import RelatedRecordBrowser from '../../components/record/RelatedRecordBrowser';

import {
  setRelatedRecordBrowserRelatedCsid,
} from '../../actions/recordBrowser';

import {
  deselectResultItem,
} from '../../actions/search';

import {
  getRecordData,
  getRelatedRecordBrowserRelatedCsid,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    relatedRecordType,
  } = ownProps;

  return {
    primaryRecordData: getRecordData(state, csid),
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
