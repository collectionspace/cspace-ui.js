import React, { PropTypes } from 'react';
import { intlShape } from 'react-intl';
import PrefixFilteringControlledInput from './PrefixFilteringControlledInput';

const propTypes = {
  ...PrefixFilteringControlledInput.propTypes,
  intl: intlShape,
  options: PropTypes.arrayOf(PropTypes.shape({
    messageDescriptor: PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string,
    }),
  })),
};

const defaultProps = {
  options: [],
};

export default function OptionControlledInput(props) {
  const {
    intl,
    options,
    ...remainingProps
  } = props;

  const labeledOptions = options.map((option) => {
    if (option.messageDescriptor) {
      return Object.assign({}, option, {
        label: intl.formatMessage(option.messageDescriptor),
      });
    }

    return option;
  });

  return (
    <PrefixFilteringControlledInput
      {...remainingProps}
      intl={intl}
      options={labeledOptions}
    />
  );
}

OptionControlledInput.propTypes = propTypes;
OptionControlledInput.defaultProps = defaultProps;
