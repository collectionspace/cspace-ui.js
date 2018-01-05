import { connect } from 'react-redux';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getUserPerms, getVocabulary } from '../../reducers';
import TermPickerInput from '../../components/record/TermPickerInput';

const mapStateToProps = (state, ownProps) => {
  const {
    source,
  } = ownProps;

  const vocabulary = getVocabulary(state, source);

  return {
    perms: getUserPerms(state),
    terms: vocabulary ? vocabulary.items : null,
  };
};

const mapDispatchToProps = {
  readTerms: readVocabularyItems,
};

const ConnectedTermPickerInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermPickerInput);

ConnectedTermPickerInput.propTypes = TermPickerInput.propTypes;

export default ConnectedTermPickerInput;
