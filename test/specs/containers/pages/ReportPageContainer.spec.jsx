import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
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
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportPageContainer store={store} />,
    );

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, ReportPage);

    page.props.should.have.property('openModalName', openModalName);
    page.props.should.have.property('perms', perms);
    page.props.should.have.property('closeModal').that.is.a('function');
    page.props.should.have.property('openModal').that.is.a('function');
    page.props.should.have.property('openReport').that.is.a('function');
    page.props.should.have.property('setToolTab').that.is.a('function');
  });
});
