import React, { PropTypes } from 'react';
import RecordBrowserNavBar from './RecordBrowserNavBar';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import styles from '../../../styles/cspace-ui/RecordBrowser.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default function RecordBrowser(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = props;

  return (
    <div className={styles.common}>
      <RecordBrowserNavBar csid={csid} />
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
        vocabulary={vocabulary}
      />
    </div>
  );
}

RecordBrowser.propTypes = propTypes;
