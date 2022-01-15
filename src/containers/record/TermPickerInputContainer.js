import { connect } from 'react-redux';
import { readVocabularyItems } from '../../actions/vocabulary';

import {
  getRecordData,
  getUserPerms,
  getVocabulary,
} from '../../reducers';

import TermPickerInput from '../../components/record/TermPickerInput';
import withCsid from '../../enhancers/withCsid';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    transformTerms,
    source,
  } = ownProps;

  const vocabulary = getVocabulary(state, source);

  let items = vocabulary ? vocabulary.items : null;

  if (transformTerms && items) {
    const recordData = getRecordData(state, csid);

    items = transformTerms({ recordData }, items);
  }

  return {
    perms: getUserPerms(state),
    terms: items,
  };
};

const mapDispatchToProps = {
  readTerms: readVocabularyItems,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    csid,
    transformTerms,
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedTermPickerInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TermPickerInput);

const WithCsidTermPickerInput = withCsid(ConnectedTermPickerInput);

WithCsidTermPickerInput.propTypes = TermPickerInput.propTypes;

export default WithCsidTermPickerInput;
