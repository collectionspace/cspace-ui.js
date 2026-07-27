import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  labelsByRefName: PropTypes.instanceOf(Map),
  value: PropTypes.string,
};

export default function MediaPriorityRow(props) {
  const { labelsByRefName, value } = props;

  return <div>{labelsByRefName?.get(value) || value || ''}</div>;
}

MediaPriorityRow.propTypes = propTypes;
