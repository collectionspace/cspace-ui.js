import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { DropdownMenuInput } from 'cspace-input';
import { getOptions } from '../../reducers';

const messages = defineMessages({
  count: {
    id: 'optionListInput.count',
    description: 'Message displayed in the option list dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matches}
        one {# match}
        other {# matches}
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
    options: labeledOptions,
  };
};

const mapDispatchToProps = () => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    intl,
    /* eslint-disable no-unused-vars */
    optionListName,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  const formatFilterMessage = count => intl.formatMessage(messages.count, { count });

  return {
    formatFilterMessage,
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

const ConnectedInput = injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DropdownMenuInput));

ConnectedInput.propTypes = {
  ...DropdownMenuInput.propTypes,
  optionListName: PropTypes.string,
};

export default ConnectedInput;
