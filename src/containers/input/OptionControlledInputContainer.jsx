import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { getOptions } from '../../reducers';

const { OptionListControlledInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'optionListControlledInput.count',
    description: 'Message displayed in the option list controlled input dropdown when filtering options.',
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

  const options = getOptions(state, optionListName);

  const labeledOptions = options.map((option) => {
    if (option.messageDescriptor) {
      return Object.assign({}, option, {
        label: intl.formatMessage(option.messageDescriptor),
      });
    }

    return option;
  });

  return {
    formatStatusMessage: count => intl.formatMessage(messages.count, { count }),
    options: labeledOptions,
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

export const ConnectedOptionControlledInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(OptionListControlledInput);

const IntlAwareConnectedOptionControlledInput = injectIntl(ConnectedOptionControlledInput);

IntlAwareConnectedOptionControlledInput.propTypes = {
  ...OptionListControlledInput.propTypes,
  optionListName: PropTypes.string,
};

export default IntlAwareConnectedOptionControlledInput;
