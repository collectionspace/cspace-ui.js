import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import CreatePage from '../../../../src/components/pages/CreatePage';
import CreatePageContainer from '../../../../src/containers/pages/CreatePageContainer';
import { findWithType } from 'react-shallow-testutils';

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
  authority: Immutable.fromJS({
    person: {
      local: {
        workflowState: 'project',
      },
    },
  }),
  user: Immutable.Map({
    perms,
  }),
});

describe('CreatePageContainer', () => {
  it('should set props on CreatePage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<CreatePageContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, CreatePage);

    page.should.not.be.null;
    page.props.should.have.property('perms', perms);
    page.props.should.have.property('getAuthorityVocabWorkflowState').that.is.a('function');
  });

  it('should return the workflow state from the store when getAuthorityVocabWorkflowState is called', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<CreatePageContainer store={store} />, context);

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, CreatePage);

    page.props.getAuthorityVocabWorkflowState('person', 'local').should.equal('project');
  });
});
