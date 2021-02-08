import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { canList } from '../../helpers/permissionHelpers';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import MediaViewerPanelContainer from '../../containers/media/MediaViewerPanelContainer';

const messages = defineMessages({
  title: {
    id: 'mediaSnapshotPanel.title',
    defaultMessage: 'Media',
  },
});

const getSearchDescriptor = (props) => {
  const {
    csid,
    mediaRecordType,
    recordData,
    recordRelationUpdatedTimestamp,
    recordType,
    sort,
  } = props;

  // Update the media snapshot when relations have changed.

  let updatedTimestamp = recordRelationUpdatedTimestamp;

  if (recordType === mediaRecordType) {
    // For a media record, the media snapshot needs to be updated when either the record data
    // changes (because the blobCsid may have changed), or relations have changed.

    const recordUpdatedTimestamp = getUpdatedTimestamp(recordData);

    updatedTimestamp = (recordRelationUpdatedTimestamp > recordUpdatedTimestamp)
      ? recordRelationUpdatedTimestamp
      : recordUpdatedTimestamp;
  }

  return Immutable.fromJS({
    recordType: mediaRecordType,
    searchQuery: {
      sort,
      rel: csid,
      p: 0,
      size: 2500,
    },
    seqID: updatedTimestamp,
  });
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  mediaRecordType: PropTypes.string,
  mediaRecordBlobCsidField: PropTypes.string,
  name: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  // These uses aren't detected by eslint.
  /* eslint-disable react/no-unused-prop-types */
  sort: PropTypes.string,
  recordRelationUpdatedTimestamp: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  recordType: PropTypes.string,
  titleMessage: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
};

const defaultProps = {
  mediaRecordType: 'media',
  mediaRecordBlobCsidField: 'ns2:media_common/blobCsid',
  name: 'mediaSnapshotPanel',
  sort: 'title',
  titleMessage: messages.title,
};

export default function MediaSnapshotPanel(props) {
  const {
    color,
    config,
    csid,
    mediaRecordType,
    mediaRecordBlobCsidField,
    name,
    perms,
    recordData,
    recordType,
    titleMessage,
  } = props;

  const searchDescriptor = getSearchDescriptor(props);

  // Don't render if list permissions on media are not present.
  // Don't render until after the record has loaded.

  if (!canList(mediaRecordType, perms) || !getUpdatedTimestamp(recordData)) {
    return null;
  }

  let ownBlobCsid;

  if (recordType === mediaRecordType) {
    // For media records, pass in the record's own blobCsid. Other types only have related media
    // blobs.

    ownBlobCsid = recordData.getIn(['document', ...mediaRecordBlobCsidField.split('/')]);
  }

  return (
    <MediaViewerPanelContainer
      collapsed
      color={color}
      config={config}
      csid={csid}
      name={name}
      ownBlobCsid={ownBlobCsid}
      searchDescriptor={searchDescriptor}
      recordType={recordType}
      title={<FormattedMessage {...titleMessage} />}
    />
  );
}

MediaSnapshotPanel.propTypes = propTypes;
MediaSnapshotPanel.defaultProps = defaultProps;
