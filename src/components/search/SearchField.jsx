import React from 'react';
import PropTypes from 'prop-types';
import Field from '../record/Field';

const propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
};

export default function SearchField(props) {
  const {
    parentPath,
    name,
    value,
    readOnly,
    onCommit,
  } = props;

  return (
    <Field
      label={undefined}
      parentPath={parentPath}
      name={name}
      readOnly={readOnly}
      repeating={false}
      value={value}
      viewType="search"
      onCommit={onCommit}
      // Do not show quick add on autocomplete inputs.
      showQuickAdd={false}
    />
  );
}

SearchField.propTypes = propTypes;
