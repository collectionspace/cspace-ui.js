import React, { PropTypes } from 'react';
import RecordButtonBarContainer from '../../containers/record/RecordButtonBarContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import styles from '../../../styles/cspace-ui/RecordTabs.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

export default function RecordTabs(props) {
  const {
    config,
    csid,
    recordType,
  } = props;

  const recordTypeConfig = config.recordTypes[recordType];

  return (
    <div className={styles.common}>
      <RecordButtonBarContainer csid={csid} recordTypeConfig={recordTypeConfig} />
      <RecordEditorContainer csid={csid} recordType={recordType} />
    </div>
  );
}

RecordTabs.propTypes = propTypes;
