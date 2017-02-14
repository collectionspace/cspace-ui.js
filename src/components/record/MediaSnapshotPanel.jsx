import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import MediaViewerPanelContainer from '../../containers/media/MediaViewerPanelContainer';

const messages = defineMessages({
  title: {
    id: 'mediaSnapshotPanel.title',
    defaultMessage: 'Media',
  },
});

// TODO: Make sort param configurable.

const getSearchDescriptor = (relatedCsid, updatedTimestamp) => ({
  recordType: 'media',
  searchQuery: {
    rel: relatedCsid,
    p: 0,
    size: 2500,
    sort: 'title',
  },
  seqID: updatedTimestamp,
});

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

export default function MediaSnapshotPanel(props) {
  const {
    color,
    config,
    csid,
    recordData,
    recordType,
  } = props;

  const searchDescriptor = getSearchDescriptor(csid, getUpdatedTimestamp(recordData));

  if (!searchDescriptor.seqID) {
    // Don't render until after the record has loaded.

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
