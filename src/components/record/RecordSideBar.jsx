import React, { PropTypes } from 'react';
import MediaSnapshotPanelContainer from '../../containers/record/MediaSnapshotPanelContainer';
import RelatedObjectPanelContainer from '../../containers/record/RelatedObjectPanelContainer';
import RelatedProcedurePanelContainer from '../../containers/record/RelatedProcedurePanelContainer';
import TermsUsedPanelContainer from '../../containers/record/TermsUsedPanelContainer';
import UsedByPanelContainer from '../../containers/record/UsedByPanelContainer';
import styles from '../../../styles/cspace-ui/RecordSideBar.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
};

export default function RecordSideBar(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = props;

  // TODO: Make sidebar components configurable based on service type/record type.

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const serviceType = recordTypeConfig.serviceConfig.serviceType;
  const isAuthority = serviceType === 'authority';

  let relatedObjects = null;
  let relatedProcedures = null;
  let usedBy = null;

  if (!isAuthority) {
    relatedObjects = (
      <RelatedObjectPanelContainer
        color="blue"
        csid={csid}
        config={config}
        recordType={recordType}
      />
    );

    relatedProcedures = (
      <RelatedProcedurePanelContainer
        color="blue"
        csid={csid}
        config={config}
        recordType={recordType}
      />
    );
  }

  if (isAuthority) {
    usedBy = (
      <UsedByPanelContainer
        color="blue"
        csid={csid}
        config={config}
        recordType={recordType}
        vocabulary={vocabulary}
      />
    );
  }

  return (
    <div className={styles.common}>
      <MediaSnapshotPanelContainer
        color="blue"
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <TermsUsedPanelContainer
        color="blue"
        csid={csid}
        config={config}
        recordType={recordType}
        vocabulary={vocabulary}
      />
      {relatedObjects}
      {relatedProcedures}
      {usedBy}
    </div>
  );
}

RecordSideBar.propTypes = propTypes;
