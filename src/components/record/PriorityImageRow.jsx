import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  labelsByRefName: PropTypes.instanceOf(Map),
  value: PropTypes.string,
};

export default function PriorityImageRow(props) {
  const { labelsByRefName, value } = props;

  return <div>{labelsByRefName?.get(value) || value || ''}</div>;
}

PriorityImageRow.propTypes = propTypes;
