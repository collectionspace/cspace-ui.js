import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import SearchToRelateModal from '../../../../src/components/search/SearchToRelateModal';
import SearchToRelateModalContainer from '../../../../src/containers/search/SearchToRelateModalContainer';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('SearchToRelateModalContainer', () => {
  it('should set props on SearchToRelateModal', () => {
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

    shallowRenderer.render(
      <SearchToRelateModalContainer store={store} />,
    );

    const result = shallowRenderer.getRenderOutput();
    const modal = findWithType(result, SearchToRelateModal);

    modal.props.should.have.property('perms').that.equals(perms);
    modal.props.should.have.property('showRelationNotification').that.is.a('function');
    modal.props.should.have.property('createRelations').that.is.a('function');
  });
});
