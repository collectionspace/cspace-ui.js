import React from 'react';
import configureMockStore from 'redux-mock-store';
import { browserHistory } from 'react-router';
import { createRenderer } from 'react-addons-test-utils';
import Router from '../../../src/components/Router';
import RouterContainer from '../../../src/containers/RouterContainer';

chai.should();

const mockStore = configureMockStore([]);

describe('RouterContainer', function suite() {
  it('should set props on Router', function test() {
    const username = 'user@collectionspace.org';

    const store = mockStore({
      user: {
        username,
      },
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<RouterContainer history={browserHistory} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Router);
    result.props.should.have.property('username', username);
    result.props.should.have.property('createNewRecord').that.is.a('function');
    result.props.should.have.property('readRecord').that.is.a('function');
    result.props.should.have.property('redirectLogin').that.is.a('function');
  });
});
