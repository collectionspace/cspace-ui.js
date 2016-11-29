import React, { Component, PropTypes } from 'react';
import PrefixFilteringControlledInput from './PrefixFilteringControlledInput';
import { getDisplayName } from '../../helpers/refNameHelpers';

const propTypes = {
  ...PrefixFilteringControlledInput.propTypes,
  items: PropTypes.arrayOf(PropTypes.shape({
    refName: PropTypes.string,
    displayName: PropTypes.string,
  })),
  onMount: PropTypes.func,
};

export default class VocabularyControlledInput extends Component {
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
      <PrefixFilteringControlledInput
        options={options}
        value={value}
        valueLabel={getDisplayName(value)}
        {...remainingProps}
      />
    );
  }
}

VocabularyControlledInput.propTypes = propTypes;
