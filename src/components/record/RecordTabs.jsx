import React, { PropTypes } from 'react';
import RecordButtonBarContainer from '../../containers/record/RecordButtonBarContainer';
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

  const recordTypeConfig = config.recordTypes[recordType];

  const vocabularyConfig = vocabulary
    ? recordTypeConfig.vocabularies[vocabulary]
    : undefined;

  return (
    <div className={styles.common}>
      <RecordButtonBarContainer
        csid={csid}
        recordTypeConfig={recordTypeConfig}
        vocabularyConfig={vocabularyConfig}
      />
      <RecordEditorContainer csid={csid} recordType={recordType} />
    </div>
  );
}

RecordTabs.propTypes = propTypes;
