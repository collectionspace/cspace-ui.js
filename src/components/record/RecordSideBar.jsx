import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import MediaSnapshotPanelContainer from '../../containers/record/MediaSnapshotPanelContainer';
import RelatedRecordPanelContainer from '../../containers/record/RelatedRecordPanelContainer';
import RecordBatchPanelContainer from '../../containers/record/RecordBatchPanelContainer';
import RecordReportPanelContainer from '../../containers/record/RecordReportPanelContainer';
import TermsUsedPanelContainer from '../../containers/record/TermsUsedPanelContainer';
import UsedByPanelContainer from '../../containers/record/UsedByPanelContainer';
import styles from '../../../styles/cspace-ui/RecordSideBar.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  history: PropTypes.object,
  isRelatable: PropTypes.bool,
};

export default function RecordSideBar(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
    history,
    isRelatable,
  } = props;

  // TODO: Make sidebar components configurable based on service type/record type.

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const serviceType = recordTypeConfig.serviceConfig.serviceType;
  const isAuthority = serviceType === 'authority';
  const isUtility = serviceType === 'utility';
  const panelColor = isAuthority ? 'purple' : 'blue';

  const relatedProcedureDescriptors =
    get(recordTypeConfig, ['sidebar', 'relatedProcedures']) || [{ recordType: 'procedure' }];

  let mediaSnapshot = null;
  let relatedObjects = null;
  let relatedProcedures = null;
  let usedBy = null;
  let reports = null;
  let batchJobs = null;

  if (!isAuthority && !isUtility) {
    mediaSnapshot = (
      <MediaSnapshotPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        recordType={recordType}
        sort={config.mediaSnapshotSort}
      />
    );

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
        showAddButton={isRelatable}
      />
    );

    relatedProcedures = relatedProcedureDescriptors.map((relatedProcedureDescriptor) => {
      const {
        sort,
        recordType: relatedProcedureType,
        columnSet = 'narrow',
      } = relatedProcedureDescriptor;

      return (
        <RelatedRecordPanelContainer
          color={panelColor}
          csid={csid}
          columnSetName={columnSet}
          config={config}
          history={history}
          initialSort={sort}
          key={relatedProcedureType}
          name={`related${upperFirst(relatedProcedureType)}Panel`}
          recordType={recordType}
          relatedRecordType={relatedProcedureType}
          showAddButton={isRelatable}
        />
      );
    });
  }

  if (!isUtility) {
    reports = (
      <RecordReportPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        recordType={recordType}
      />
    );

    batchJobs = (
      <RecordBatchPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        history={history}
        recordType={recordType}
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
      {mediaSnapshot}
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
      {reports}
      {batchJobs}
    </div>
  );
}

RecordSideBar.propTypes = propTypes;
