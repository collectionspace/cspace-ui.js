import { connect } from 'react-redux';
import { parseDisplayDate } from '../../actions/structuredDate';
import { readVocabularyItems } from '../../actions/vocabulary';
import StructuredDateInput from '../../components/record/StructuredDateInput';
import { getOptionList, getUserPerms, getVocabulary } from '../../reducers';
import withConfig from '../../enhancers/withConfig';

const mapStateToProps = (state, ownProps) => {
  const {
    config,
    structDateOptionListNames: ownStructDateOptionListNames,
    structDateVocabNames: ownStructDateVocabNames,
  } = ownProps;

  const {
    structDateOptionListNames: configStructDateOptionListNames,
    structDateVocabNames: configStructDateVocabNames,
  } = config;

  const structDateOptionListNames = ownStructDateOptionListNames || configStructDateOptionListNames;
  const structDateVocabNames = ownStructDateVocabNames || configStructDateVocabNames;

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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    structDateOptionListNames,
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedStructuredDateInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(StructuredDateInput);

const ConnectedStructuredDateInputWithConfig = withConfig(ConnectedStructuredDateInput);

ConnectedStructuredDateInputWithConfig.propTypes = StructuredDateInput.propTypes;

export default ConnectedStructuredDateInputWithConfig;
