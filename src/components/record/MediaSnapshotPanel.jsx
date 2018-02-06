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

// TODO: Make sort param configurable.

const getSearchDescriptor = (props) => {
  const {
    csid,
    recordData,
    recordRelationUpdatedTimestamp,
    recordType,
  } = props;

  // Update the media snapshot when relations have changed.

  let updatedTimestamp = recordRelationUpdatedTimestamp;

  if (recordType === 'media') {
    // For a media record, the media snapshot needs to be updated when either the record data
    // changes (because the blobCsid may have changed), or relations have changed.

    const recordUpdatedTimestamp = getUpdatedTimestamp(recordData);

    updatedTimestamp = (recordRelationUpdatedTimestamp > recordUpdatedTimestamp)
      ? recordRelationUpdatedTimestamp
      : recordUpdatedTimestamp;
  }

  return Immutable.fromJS({
    recordType: 'media',
    searchQuery: {
      rel: csid,
      p: 0,
      size: 2500,
      sort: 'title',
    },
    seqID: updatedTimestamp,
  });
};

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  // This use isn't detected by eslint.
  /* eslint-disable react/no-unused-prop-types */
  recordRelationUpdatedTimestamp: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  recordType: PropTypes.string,
};

export default function MediaSnapshotPanel(props) {
  const {
    color,
    config,
    csid,
    perms,
    recordData,
    recordType,
  } = props;

  const searchDescriptor = getSearchDescriptor(props);

  // Don't render if list permissions on media are not present.
  // Don't render until after the record has loaded.

  if (!canList('media', perms) || !getUpdatedTimestamp(recordData)) {
    return null;
  }

  let ownBlobCsid;

  if (recordType === 'media') {
    // For media records, pass in the record's own blobCsid. Other types only have related media
    // blobs.

    ownBlobCsid = recordData.getIn(['document', 'ns2:media_common', 'blobCsid']);
  }

  return (
    <MediaViewerPanelContainer
      collapsed
      color={color}
      columnSetName="narrow"
      config={config}
      csid={csid}
      name="mediaSnapshotPanel"
      ownBlobCsid={ownBlobCsid}
      searchDescriptor={searchDescriptor}
      recordType={recordType}
      title={<FormattedMessage {...messages.title} />}
    />
  );
}

MediaSnapshotPanel.propTypes = propTypes;
