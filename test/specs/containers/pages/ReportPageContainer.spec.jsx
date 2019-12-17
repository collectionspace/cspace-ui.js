import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ReportPage from '../../../../src/components/pages/ReportPage';
import ReportPageContainer from '../../../../src/containers/pages/ReportPageContainer';

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

describe('ReportPageContainer', () => {
  it('should set props on ReportPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPageContainer />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ReportPage);
    result.props.should.have.property('openModalName', openModalName);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('closeModal').that.is.a('function');
    result.props.should.have.property('openModal').that.is.a('function');
    result.props.should.have.property('openReport').that.is.a('function');
    result.props.should.have.property('setToolTab').that.is.a('function');
  });
});
