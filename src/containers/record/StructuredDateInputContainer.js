import { connect } from 'react-redux';
import { parseDisplayDate } from '../../actions/structuredDate';
import { readVocabularyItems } from '../../actions/vocabulary';
import StructuredDateInput from '../../components/record/StructuredDateInput';
import { getOptionList, getUserPerms, getVocabulary } from '../../reducers';
import withConfig from '../../enhancers/withConfig';

const mapStateToProps = (state, ownProps) => {
  const { config } = ownProps;

  const {
    structDateOptionListNames,
    structDateVocabNames,
  } = config;

  const optionLists = {};
  const terms = {};

  structDateOptionListNames.forEach((optionListName) => {
    optionLists[optionListName] = getOptionList(state, optionListName);
  });

  structDateVocabNames.forEach((vocabName) => {
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

const ConnectedStructuredDateInputWithConfig = withConfig(ConnectedStructuredDateInput);

ConnectedStructuredDateInputWithConfig.propTypes = StructuredDateInput.propTypes;

export default ConnectedStructuredDateInputWithConfig;
