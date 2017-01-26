import React, { PropTypes } from 'react';
import RelatedObjectPanelContainer from '../../containers/record/RelatedObjectPanelContainer';
import RelatedProcedurePanelContainer from '../../containers/record/RelatedProcedurePanelContainer';
import TermsUsedPanelContainer from '../../containers/record/TermsUsedPanelContainer';
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
      <TermsUsedPanelContainer
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <RelatedObjectPanelContainer
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <RelatedProcedurePanelContainer
        csid={csid}
        config={config}
        recordType={recordType}
      />
    </div>
  );
}

RecordSideBar.propTypes = propTypes;
