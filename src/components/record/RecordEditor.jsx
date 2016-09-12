import React, { PropTypes } from 'react';

export default function RecordEditor(props) {
  const {
    data,
  } = props;

  return (
    <form>{JSON.stringify(data)}</form>
  );
}

RecordEditor.propTypes = {
  data: PropTypes.object,
};

RecordEditor.defaultProps = {
  data: {},
};
