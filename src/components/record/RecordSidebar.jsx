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
import styles from '../../../styles/cspace-ui/RecordSidebar.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  history: PropTypes.object,
  isOpen: PropTypes.bool,
  isRelatable: PropTypes.bool,
};

const defaultProps = {
  isOpen: true,
};

export default function RecordSidebar(props) {
  const {
    config,
    csid,
    recordType,
    vocabulary,
    history,
    isOpen,
    isRelatable,
  } = props;

  if (!isOpen) {
    return null;
  }

  // TODO: Make sidebar components configurable based on service type/record type.

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const serviceType = recordTypeConfig.serviceConfig.serviceType;
  const isAuthority = serviceType === 'authority';
  const isUtility = serviceType === 'utility';
  const panelColor = isAuthority ? 'purple' : 'blue';

  const relatedRecordDescriptors =
    get(recordTypeConfig, ['sidebar', 'relatedRecords']) ||
    [{ recordType: 'collectionobject' }, { recordType: 'procedure' }];

  let mediaSnapshot = null;
  let relatedRecords = null;
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

    relatedRecords = relatedRecordDescriptors.map((relatedRecordDescriptor) => {
      const {
        sort,
        recordType: relatedRecordType,
        columnSet = 'narrow',
      } = relatedRecordDescriptor;

      return (
        <RelatedRecordPanelContainer
          color={panelColor}
          csid={csid}
          columnSetName={columnSet}
          config={config}
          history={history}
          initialSort={sort}
          key={relatedRecordType}
          name={`related${upperFirst(relatedRecordType)}Panel`}
          recordType={recordType}
          relatedRecordType={relatedRecordType}
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
      {relatedRecords}
      {usedBy}
      {reports}
      {batchJobs}
    </div>
  );
}

RecordSidebar.propTypes = propTypes;
RecordSidebar.defaultProps = defaultProps;
