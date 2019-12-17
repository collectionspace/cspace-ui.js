import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ToolPage from '../../../../src/components/pages/ToolPage';
import ToolPageContainer from '../../../../src/containers/pages/ToolPageContainer';

chai.should();

const mockStore = configureMockStore();

const toolTab = 'tabName';

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

const store = mockStore({
  prefs: Immutable.Map({
    toolTab,
  }),
  user: Immutable.Map({
    perms,
  }),
});

describe('ToolPageContainer', () => {
  it('should set props on ToolPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ToolPageContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ToolPage);
    result.props.should.have.property('perms', perms);
    result.props.should.have.property('preferredTab', toolTab);
  });
});
