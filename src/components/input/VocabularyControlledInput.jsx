import React, { Component, PropTypes } from 'react';
import { intlShape } from 'react-intl';
import ControlledInput from './ControlledInput';
import { getDisplayName } from '../../helpers/refNameHelpers';

class VocabularyControlledInput extends Component {
  componentDidMount() {
    const {
      onMount,
    } = this.props;

    if (onMount) {
      onMount();
    }
  }

  render() {
    const {
      intl,
      items,
      onMount,
      value,
      ...remainingProps
    } = this.props;

    const options = items ? items.map(option => ({
      value: option.refName,
      label: option.displayName,
    })) : [];

    return (
      <ControlledInput
        intl={intl}
        options={options}
        value={value}
        valueLabel={getDisplayName(value)}
        {...remainingProps}
      />
    );
  }
};

VocabularyControlledInput.propTypes = {
  ...ControlledInput.propTypes,
  intl: intlShape,
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  onMount: PropTypes.func,
};

export default VocabularyControlledInput;
