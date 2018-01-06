import { connect } from 'react-redux';
import { parseDisplayDate } from '../../actions/structuredDate';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getOptionList, getUserPerms, getVocabulary } from '../../reducers';

import StructuredDateInput, {
  optionListNames,
  vocabNames,
} from '../../components/record/StructuredDateInput';

const mapStateToProps = (state) => {
  const optionLists = {};
  const terms = {};

  optionListNames.forEach((optionListName) => {
    optionLists[optionListName] = getOptionList(state, optionListName);
  });

  vocabNames.forEach((vocabName) => {
    const vocab = getVocabulary(state, vocabName);

    terms[vocabName] = vocab ? vocab.items : null;
  });

  return {
    optionLists,
    terms,
    perms: getUserPerms(state),
  };
};

const mapDispatchToProps = {
  parseDisplayDate,
  readTerms: readVocabularyItems,
};

export const ConnectedStructuredDateInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StructuredDateInput);

ConnectedStructuredDateInput.propTypes = StructuredDateInput.propTypes;

export default ConnectedStructuredDateInput;
