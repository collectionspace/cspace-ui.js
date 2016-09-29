import React, { PropTypes } from 'react';
import RecordButtonBarContainer from '../../containers/record/RecordButtonBarContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import styles from '../../../styles/cspace-ui/RecordPage.css';

export default function RecordPage(props, context) {
  let {
    csid,
  } = props.params;

  const {
    recordType,
  } = props.params;

  const {
    recordTypePlugins,
  } = context;

  const serviceConfig = recordTypePlugins[recordType].serviceConfig;

  if (csid === null || typeof csid === 'undefined') {
    csid = '';
  }

  return (
    <div className={styles.common}>
      <RecordTitleBarContainer csid={csid} recordType={recordType} />
      <RecordButtonBarContainer csid={csid} recordType={recordType} serviceConfig={serviceConfig} />
      <RecordEditorContainer csid={csid} recordType={recordType} />
    </div>
  );
}

RecordPage.propTypes = {
  params: PropTypes.object.isRequired,
};

RecordPage.contextTypes = {
  recordTypePlugins: PropTypes.object,
};
