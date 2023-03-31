import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import MediaSnapshotPanelContainer from '../../../../src/containers/record/MediaSnapshotPanelContainer';
import RecordSidebar from '../../../../src/components/record/RecordSidebar';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    group: {
      serviceConfig: {
        serviceType: 'procedure',
      },
    },
  },
};

describe('RecordSidebar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing if the record type is unknown', function test() {
    render(
      <RecordSidebar
        config={config}
        recordType="foo"
      />, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if isOpen is false', function test() {
    render(
      <RecordSidebar
        config={config}
        recordType="group"
        isOpen={false}
      />, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render a secondary media snapshot panel if altMediaSnapshot is supplied in config', () => {
    const altMediaSnapshotConfig = {
      altMediaSnapshot: {
        mediaRecordType: 'altMediaRecordType',
        mediaRecordBlobCsidField: 'ns2:altmedia_common/blobCsid',
        name: 'altMediaSnapshot',
        sort: 'title',
        titleMessage: {
          id: 'altMediaSnapshot.title',
          defaultMessage: 'Other Media',
        },
      },
      ...config,
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordSidebar
        config={altMediaSnapshotConfig}
        recordType="group"
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const mediaPanels = findAllWithType(result, MediaSnapshotPanelContainer);

    mediaPanels.should.have.length.of(2);
  });
});
