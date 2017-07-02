import { connect } from 'react-redux';
import RelatedRecordBrowser from '../../components/record/RelatedRecordBrowser';

import {
  setRelatedRecordBrowserRelatedCsid,
} from '../../actions/recordBrowser';

import {
  invalidateSubjectRelations,
} from '../../actions/relation';

import {
  deselectResultItem,
} from '../../actions/search';

import {
  getRelatedRecordBrowserRelatedCsid,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    relatedRecordType,
  } = ownProps;

  return {
    preferredRelatedCsid: getRelatedRecordBrowserRelatedCsid(state, relatedRecordType),
  };
};

const mapDispatchToProps = {
  invalidateSubjectRelations,
  deselectItem: deselectResultItem,
  setPreferredRelatedCsid: setRelatedRecordBrowserRelatedCsid,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelatedRecordBrowser);
