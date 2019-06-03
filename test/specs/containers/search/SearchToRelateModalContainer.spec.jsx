import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchToRelateModal from '../../../../src/components/search/SearchToRelateModal';
import SearchToRelateModalContainer from '../../../../src/containers/search/SearchToRelateModalContainer';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchToRelateModalContainer', function suite() {
  it('should set props on SearchToRelateModal', function test() {
    const perms = Immutable.fromJS({
      person: {
        data: 'CRUDL',
      },
    });

    const store = mockStore({
      user: Immutable.fromJS({
        perms,
      }),
    });

    const shallowRenderer = createRenderer();

    const context = {
      store,
    };

    shallowRenderer.render(
      <SearchToRelateModalContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchToRelateModal);
    result.props.should.have.property('perms').that.equals(perms);
    result.props.should.have.property('showRelationNotification').that.is.a('function');
    result.props.should.have.property('createRelations').that.is.a('function');
  });
});
