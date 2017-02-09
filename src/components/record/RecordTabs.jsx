import React, { PropTypes } from 'react';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import styles from '../../../styles/cspace-ui/RecordTabs.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default function RecordTabs(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = props;

  return (
    <div className={styles.common}>
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
        vocabulary={vocabulary}
      />
    </div>
  );
}

RecordTabs.propTypes = propTypes;
