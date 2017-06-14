import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import ProtectedPage from '../../../../src/components/pages/ProtectedPage';
import ProtectedPageContainer from '../../../../src/containers/pages/ProtectedPageContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('ProtectedPageContainer', function suite() {
  it('should set props on ProtectedPage', function test() {
    const username = 'user@collectionspace.org';

    const store = mockStore({
      user: {
        username,
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ProtectedPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ProtectedPage);
    result.props.should.have.property('username', username);
  });
});
