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
  config: PropTypes.shape({
    altMediaSnapshot: PropTypes.shape({
      mediaRecordType: PropTypes.string.isRequired,
      mediaRecordBlobCsidField: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sort: PropTypes.string.isRequired,
      titleMessage: PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }).isRequired,
    }),
    mediaSnapshotSort: PropTypes.string,
    recordTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
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

  const { serviceType } = recordTypeConfig.serviceConfig;
  const isAudit = serviceType === 'audit';
  const isAuthority = serviceType === 'authority';
  const isUtility = serviceType === 'utility';
  const panelColor = isAuthority ? 'purple' : 'blue';

  const relatedRecordDescriptors = get(recordTypeConfig, ['sidebar', 'relatedRecords'])
    || [{ recordType: 'collectionobject' }, { recordType: 'procedure' }];

  let mediaSnapshot = null;
  let altMediaSnapshot = null;
  let relatedRecords = null;
  let audit = null;
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

    if (config.altMediaSnapshot) {
      const {
        mediaRecordType,
        mediaRecordBlobCsidField,
        name,
        sort,
        titleMessage,
      } = config.altMediaSnapshot;

      altMediaSnapshot = (
        <MediaSnapshotPanelContainer
          color={panelColor}
          csid={csid}
          config={config}
          mediaRecordType={mediaRecordType}
          mediaRecordBlobCsidField={mediaRecordBlobCsidField}
          name={name}
          recordType={recordType}
          sort={sort}
          titleMessage={titleMessage}
        />
      );
    }

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

  if (!isAudit) {
    audit = (
      <RelatedRecordPanelContainer
        color={panelColor}
        csid={csid}
        columnSetName="narrow"
        config={config}
        initialSort={undefined}
        key="audit"
        name="relatedAuditPanel"
        recordType={recordType}
        relatedRecordType="audit"
        showAddButton={false}
        listType="audit"
      />
    );
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
        recordType={recordType}
        vocabulary={vocabulary}
      />
    );
  }

  return (
    <div className={styles[serviceType]}>
      {mediaSnapshot}
      {altMediaSnapshot}
      <TermsUsedPanelContainer
        color={panelColor}
        csid={csid}
        config={config}
        recordType={recordType}
        vocabulary={vocabulary}
      />
      {relatedRecords}
      {usedBy}
      {reports}
      {batchJobs}
      {audit}
    </div>
  );
}

RecordSidebar.propTypes = propTypes;
RecordSidebar.defaultProps = defaultProps;
