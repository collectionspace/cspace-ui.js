import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
import RecordPage from '../../../../src/components/pages/RecordPage';
import { ConnectedRecordPage } from '../../../../src/containers/pages/RecordPageContainer';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('RecordPageContainer', () => {
  it('should set props on RecordPage', () => {
    const recordType = 'group';
    const csid = '3f702416-1897-43ce-a9f5';

    const config = {
      recordTypes: {
        [recordType]: {
          serviceConfig: {
            serviceType: 'procedure',
          },
        },
      },
    };

    const error = Immutable.Map({
      code: 'ERR_CODE',
    });

    const store = mockStore({
      record: Immutable.fromJS({
        [csid]: {
          error,
        },
      }),
      user: Immutable.Map(),
      prefs: Immutable.Map(),
    });

    const match = {
      params: {
        recordType,
        path1: csid,
      },
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedRecordPage
        store={store}
        config={config}
        match={match}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, RecordPage);

    page.type.should.equal(RecordPage);
    page.props.should.have.property('error', error);
  });
});
