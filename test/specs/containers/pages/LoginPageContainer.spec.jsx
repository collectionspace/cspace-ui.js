import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import LoginPage from '../../../../src/components/pages/LoginPage';
import LoginPageContainer from '../../../../src/containers/pages/LoginPageContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('LoginPageContainer', function suite() {
  it('should set props on LoginPage', function test() {
    const continuation = '/some/page';

    const store = mockStore({
      login: Immutable.Map({
        continuation,
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LoginPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(LoginPage);
    result.props.should.have.property('continuation', continuation);
  });
});
