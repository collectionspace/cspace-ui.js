import React, { PropTypes } from 'react';
import Field from '../../record/Field';

const propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
  onCommit: PropTypes.func,
};

export default function SearchField(props) {
  const {
    parentPath,
    name,
    value,
    onCommit,
  } = props;

  return (
    <Field
      parentPath={parentPath}
      name={name}
      value={value}
      viewType="search"
      onCommit={onCommit}
    />
  );
}

SearchField.propTypes = propTypes;
