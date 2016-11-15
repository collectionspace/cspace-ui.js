import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import warning from 'warning';
import VocabularyControlledInput from '../../components/input/VocabularyControlledInput';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getVocabulary } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    vocabularyName,
  } = ownProps;
  
  const vocabulary = getVocabulary(state, vocabularyName);

  return {
    isLoading: vocabulary ? vocabulary.isLoading : true,
    items: vocabulary ? vocabulary.items : null,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    name,
    vocabularyName,
  } = ownProps;

  warning(vocabularyName,
    `The vocabulary controlled input with name '${name}' is not associated with a vocabulary. Set the 'vocabularyName' prop.`);

  if (vocabularyName) {
    return {
      onMount: () => {
        dispatch(readVocabularyItems(vocabularyName));
      },
    }
  }
  
  return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    onMount,
    vocabularyName,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

const ConnectedInput = injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(VocabularyControlledInput));

ConnectedInput.propTypes = {
  ...VocabularyControlledInput.propTypes,
  vocabularyName: PropTypes.string.isRequired,
};

export default ConnectedInput;
