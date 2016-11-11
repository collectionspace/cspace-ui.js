import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { DropdownMenuInput } from 'cspace-input';
import { getOptions } from '../../reducers';

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
