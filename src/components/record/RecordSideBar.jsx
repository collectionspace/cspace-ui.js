import React from 'react';
import PropTypes from 'prop-types';
import MediaSnapshotPanelContainer from '../../containers/record/MediaSnapshotPanelContainer';
import RelatedRecordPanelContainer from '../../containers/record/RelatedRecordPanelContainer';
import TermsUsedPanelContainer from '../../containers/record/TermsUsedPanelContainer';
import UsedByPanelContainer from '../../containers/record/UsedByPanelContainer';
import styles from '../../../styles/cspace-ui/RecordSideBar.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  history: PropTypes.object,
};

export default function RecordSideBar(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
    history,
  } = props;

  // TODO: Make sidebar components configurable based on service type/record type.

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const serviceType = recordTypeConfig.serviceConfig.serviceType;
  const isAuthority = serviceType === 'authority';
  const panelColor = isAuthority ? 'purple' : 'blue';

  let relatedObjects = null;
  let relatedProcedures = null;
  let usedBy = null;

  if (!isAuthority) {
    relatedObjects = (
      <RelatedRecordPanelContainer
        color={panelColor}
        columnSetName="narrow"
        csid={csid}
        config={config}
        history={history}
        name="relatedObjectPanel"
        recordType={recordType}
        relatedRecordType="collectionobject"
        showAddButton
      />
    );

    relatedProcedures = (
      <RelatedRecordPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        history={history}
        name="relatedProcedurePanel"
        recordType={recordType}
        relatedRecordType="procedure"
        showAddButton
      />
    );
  }

  if (isAuthority) {
    usedBy = (
      <UsedByPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        history={history}
        recordType={recordType}
        vocabulary={vocabulary}
      />
    );
  }

  return (
    <div className={styles[serviceType]}>
      <MediaSnapshotPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        recordType={recordType}
      />
      <TermsUsedPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        history={history}
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
