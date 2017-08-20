import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import RecordFormContainer from '../../containers/record/RecordFormContainer';

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
};

const defaultProps = {
  template: 'default',
};

export default function SubrecordEditor(props) {
  const {
    config,
    recordType,
    vocabulary,
    csid,
    data,
    formName,
  } = props;

  return (
    <RecordFormContainer
      config={config}
      recordType={recordType}
      vocabulary={vocabulary}
      csid={csid}
      data={data}
      formName={formName}
    />
  );
}

SubrecordEditor.propTypes = propTypes;
SubrecordEditor.defaultProps = defaultProps;
