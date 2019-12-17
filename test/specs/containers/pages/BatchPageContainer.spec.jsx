import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import BatchPage from '../../../../src/components/pages/BatchPage';
import BatchPageContainer from '../../../../src/containers/pages/BatchPageContainer';

chai.should();

const mockStore = configureMockStore();

const perms = Immutable.fromJS({
  report: {
    data: 'RUL',
  },
});

const csid = '1234';
const openModalName = 'fooModal';
const data = Immutable.Map();

const store = mockStore({
  notification: Immutable.Map({
    modal: openModalName,
  }),
  record: Immutable.fromJS({
    [csid]: {
      data: {
        current: data,
      },
    },
  }),
  user: Immutable.Map({
    perms,
  }),
});

describe('BatchPageContainer', () => {
  it('should set props on BatchPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <BatchPageContainer />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BatchPage);
    result.props.should.have.property('openModalName', openModalName);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('closeModal').that.is.a('function');
    result.props.should.have.property('openModal').that.is.a('function');
    result.props.should.have.property('invoke').that.is.a('function');
    result.props.should.have.property('setToolTab').that.is.a('function');
  });
});
