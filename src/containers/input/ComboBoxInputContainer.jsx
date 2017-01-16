import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { getOptionList } from '../../reducers';

const { ComboBoxInput } = inputComponents;

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    optionListName,
  } = ownProps;

  const options = getOptionList(state, optionListName);

  return {
    options,
    formatOptionLabel: option => (
      option.message ? intl.formatMessage(option.message) : option.value
    ),
  };
};

const mapDispatchToProps = {};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    intl,
    optionListName,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedComboBoxInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ComboBoxInput);

const IntlizedConnectedComboBoxInput = injectIntl(ConnectedComboBoxInput);

IntlizedConnectedComboBoxInput.propTypes = {
  ...ComboBoxInput.propTypes,
  optionListName: PropTypes.string,
};

export default IntlizedConnectedComboBoxInput;
