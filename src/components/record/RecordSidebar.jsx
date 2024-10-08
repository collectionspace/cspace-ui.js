import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import MediaSnapshotPanelContainer from '../../containers/record/MediaSnapshotPanelContainer';
import RelatedRecordPanelContainer from '../../containers/record/RelatedRecordPanelContainer';
import RecordBatchPanelContainer from '../../containers/record/RecordBatchPanelContainer';
import RecordReportPanelContainer from '../../containers/record/RecordReportPanelContainer';
import RecordSidebarToggleButtonContainer from '../../containers/record/RecordSidebarToggleButtonContainer';
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

  if (!isOpen) {
    return (
      <div className={styles.closed}>
        <RecordSidebarToggleButtonContainer
          recordType={recordType}
          config={config}
        />
      </div>
    );
  }

  const relatedRecordDescriptors = get(recordTypeConfig, ['sidebar', 'relatedRecords'])
    || [{ recordType: 'collectionobject' }, { recordType: 'procedure' }];

  let mediaSnapshot = null;
  let altMediaSnapshot = null;
  let relatedRecords = null;
  let audit = null;
  let usedBy = null;
  let reports = null;
  let batchJobs = null;

  if (!isAuthority && !isUtility && !isAudit) {
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
        id,
        sort,
        serviceTag,
        recordType: relatedRecordType,
        columnSet = 'narrow',
      } = relatedRecordDescriptor;

      const panelName = id ? `related${upperFirst(id)}Panel` : `related${upperFirst(relatedRecordType)}Panel`;

      return (
        <RelatedRecordPanelContainer
          color={panelColor}
          csid={csid}
          columnSetName={columnSet}
          config={config}
          initialSort={sort}
          key={panelName}
          name={panelName}
          panelId={id}
          recordType={recordType}
          relatedRecordType={relatedRecordType}
          showAddButton={isRelatable}
          serviceTag={serviceTag}
        />
      );
    });
  }

  if (!isAudit) {
    // Temporarily disable until services support exists.
    // audit = (
    //   <RelatedRecordPanelContainer
    //     color={panelColor}
    //     csid={csid}
    //     columnSetName="narrow"
    //     config={config}
    //     initialSort={undefined}
    //     key="audit"
    //     name="relatedAuditPanel"
    //     recordType={recordType}
    //     relatedRecordType="audit"
    //     showAddButton={false}
    //     showSearchButton={false}
    //     listType="audit"
    //   />
    // );
    audit = null;
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
      <RecordSidebarToggleButtonContainer
        recordType={recordType}
        config={config}
      />
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
