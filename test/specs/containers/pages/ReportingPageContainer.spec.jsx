import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ReportingPage from '../../../../src/components/pages/ReportingPage';
import ReportingPageContainer from '../../../../src/containers/pages/ReportingPageContainer'

chai.should()

const mockStore = configureMockStore();

const perms = Immutable.fromJS({
  report: {
    data: 'RUL',
  },
});

const csid = '1234';
const data = Immutable.Map();

const store = mockStore({
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

describe('ReportingPageContainer', function suite() {
  it('should set props on ReportingPage', function test() {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportingPageContainer
        match={{
          params: {
            csid,
          },
        }}
      />, context);

      const result = shallowRenderer.getRenderOutput();

      result.type.should.equal(ReportingPage);
      result.props.should.have.property('data', data);
      result.props.should.have.property('perms', perms);
  });
});
