import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
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

  it('should render show sidebar message if isOpen is false', function test() {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      prefs: Immutable.Map({
        recordSidebarOpen: false,
      }),
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordSidebar
            config={config}
            recordType="group"
            isOpen={false}
          />
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-SidebarToggleBar--common').textContent.should.equal('Show sidebar');
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
