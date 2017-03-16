import React, { PropTypes } from 'react';
import RecordBrowserNavBarContainer from '../../containers/record/RecordBrowserNavBarContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RelatedRecordBrowser from './RelatedRecordBrowser';
import styles from '../../../styles/cspace-ui/RecordBrowser.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  vocabulary: PropTypes.string,
  onShowRelated: PropTypes.func,
};

export default function RecordBrowser(props) {
  const {
    config,
    csid,
    recordType,
    relatedRecordType,
    vocabulary,
    onShowRelated,
  } = props;

  let content;

  if (relatedRecordType) {
    content = (
      <RelatedRecordBrowser />
    );
  } else {
    content = (
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
        vocabulary={vocabulary}
      />
    );
  }

  return (
    <div className={styles.common}>
      <RecordBrowserNavBarContainer
        config={config}
        csid={csid}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        onSelect={onShowRelated}
      />
      {content}
    </div>
  );
}

RecordBrowser.propTypes = propTypes;
