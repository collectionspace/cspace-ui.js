import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { getOptionList } from '../../reducers';

const { OptionPickerInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'optionPickerInput.count',
    description: 'Message displayed in the option picker input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matching options}
        one {# matching option}
        other {# matching options}
    } found`,
  },
});

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
    formatStatusMessage: count => intl.formatMessage(messages.count, { count }),
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

export const ConnectedOptionPickerInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(OptionPickerInput);

const IntlizedConnectedOptionPickerInput = injectIntl(ConnectedOptionPickerInput);

IntlizedConnectedOptionPickerInput.propTypes = {
  ...OptionPickerInput.propTypes,
  optionListName: PropTypes.string,
};

export default IntlizedConnectedOptionPickerInput;
