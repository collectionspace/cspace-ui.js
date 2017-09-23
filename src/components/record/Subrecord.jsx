import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import warning from 'warning';
import SubrecordEditorContainer from '../../containers/record/SubrecordEditorContainer';

const propTypes = {
  name: PropTypes.string,
  showDetachButton: PropTypes.bool,
  template: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

export default function Subrecord(props, context) {
  const {
    config,
    csid,
    recordType,
  } = context;

  const {
    name,
    template,
    showDetachButton,
  } = props;

  const subrecordConfig = get(config, ['recordTypes', recordType, 'subrecords', name]);

  warning(subrecordConfig, `No subrecord is configured with name ${name} for the record type ${recordType}.`);

  if (!subrecordConfig) {
    return null;
  }

  return (
    <SubrecordEditorContainer
      containerCsid={csid}
      name={name}
      config={config}
      subrecordConfig={subrecordConfig}
      formName={template}
      showDetachButton={showDetachButton}
    />
  );
}

Subrecord.propTypes = propTypes;
Subrecord.contextTypes = contextTypes;
