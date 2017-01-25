import React, { PropTypes } from 'react';
import RelatedObjectPanel from './RelatedObjectPanel';
import RelatedProcedurePanel from './RelatedProcedurePanel';
import TermsUsedPanel from './TermsUsedPanel';
import styles from '../../../styles/cspace-ui/RecordSideBar.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

export default function RecordSideBar(props) {
  const {
    config,
    csid,
    recordType,
  } = props;

  return (
    <div className={styles.common}>
      <TermsUsedPanel
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <RelatedObjectPanel
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <RelatedProcedurePanel
        csid={csid}
        config={config}
        recordType={recordType}
      />
    </div>
  );
}

RecordSideBar.propTypes = propTypes;
