import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import CreatePage from '../../../../src/components/pages/CreatePage';
import CreatePageContainer from '../../../../src/containers/pages/CreatePageContainer';

chai.should();

const mockStore = configureMockStore();

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  user: Immutable.Map({
    perms,
  }),
});

describe('CreatePageContainer', function suite() {
  it('should set props on CreatePage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<CreatePageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(CreatePage);
    result.props.should.have.property('perms', perms);
  });
});
