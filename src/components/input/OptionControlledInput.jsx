import React, { PropTypes } from 'react';
import { intlShape } from 'react-intl';
import ControlledInput from './ControlledInput';

const OptionControlledInput = (props) => {
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
    <ControlledInput
      intl={intl}
      options={labeledOptions}
      {...remainingProps}
    />
  );
};

OptionControlledInput.propTypes = {
  ...ControlledInput.propTypes,
  intl: intlShape,
  options: PropTypes.arrayOf(PropTypes.shape({
    messageDescriptor: PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string,
    }),
  })),
};

export default OptionControlledInput;
