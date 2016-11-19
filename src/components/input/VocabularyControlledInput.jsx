import React, { Component, PropTypes } from 'react';
import { enhancers as inputEnhancers } from 'cspace-input';
import ControlledInput from './ControlledInput';
import { getDisplayName } from '../../helpers/refNameHelpers';

const { repeatable } = inputEnhancers;

export class BaseVocabularyControlledInput extends Component {
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
      items,
      value,
      /* eslint-disable no-unused-vars */
      onMount,
      /* eslint-disable no-unused-vars */
      ...remainingProps
    } = this.props;

    const options = items ? items.map(item => ({
      value: item.refName,
      label: item.displayName,
    })) : [];

    return (
      <ControlledInput
        options={options}
        value={value}
        valueLabel={getDisplayName(value)}
        {...remainingProps}
      />
    );
  }
}

BaseVocabularyControlledInput.propTypes = {
  ...ControlledInput.propTypes,
  items: PropTypes.arrayOf(PropTypes.shape({
    refName: PropTypes.string,
    displayName: PropTypes.string,
  })),
  onMount: PropTypes.func,
};

export default repeatable(BaseVocabularyControlledInput);
