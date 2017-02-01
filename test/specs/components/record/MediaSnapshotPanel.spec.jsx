import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import MediaViewerPanelContainer from '../../../../src/containers/media/MediaViewerPanelContainer';
import MediaSnapshotPanel from '../../../../src/components/record/MediaSnapshotPanel';

const expect = chai.expect;

chai.should();

const recordData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      updatedAt: '2017-01-26T08:08:47.026Z',
    },
  },
});

describe('MediaSnapshotPanel', function suite() {
  it('should render a media viewer panel', function test() {
    const config = {};
    const recordType = 'object';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaSnapshotPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(MediaViewerPanelContainer);

    result.props.config.should.equal(config);
    result.props.csid.should.equal(csid);
    result.props.recordType.should.equal(recordType);
  });

  it('should rerender with a new search descriptor when a new csid is supplied via props', function test() {
    const config = {};
    const recordType = 'object';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaSnapshotPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.searchDescriptor.searchQuery.should.have.property('rel', csid);

    const newCsid = '5678';

    shallowRenderer.render(
      <MediaSnapshotPanel
        config={config}
        csid={newCsid}
        recordData={recordData}
        recordType={recordType}
      />);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.searchQuery.should.have.property('rel', newCsid);
  });

  it('should render nothing if the record data has not been saved', function test() {
    const config = {};
    const recordType = 'object';

    const unsavedRecordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: null,
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaSnapshotPanel
        config={config}
        recordData={unsavedRecordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should set the ownBlobCsid prop when the record is a media record', function test() {
    const config = {};
    const recordType = 'media';
    const csid = '1234';
    const blobCsid = '5678';

    const mediaRecordData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          updatedAt: '2017-01-26T08:08:47.026Z',
        },
        'ns2:media_common': {
          blobCsid,
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaSnapshotPanel
        config={config}
        csid={csid}
        recordData={mediaRecordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.ownBlobCsid.should.equal(blobCsid);
  });
});
