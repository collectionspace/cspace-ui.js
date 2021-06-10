import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import VocabularyUsedByPanel from '../../../../src/components/admin/VocabularyUsedByPanel';
import VocabularyUsedByPanelContainer from '../../../../src/containers/admin/VocabularyUsedByPanelContainer';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore();

describe('VocabularyUsedByPanelContainer', () => {
  const csid = '1234';

  const data = Immutable.fromJS({
    foo: 'bar',
  });

  const store = mockStore({
    record: Immutable.fromJS({
      [csid]: {
        data: {
          baseline: data,
          current: data,
        },
      },
    }),
  });

  const context = {
    store,
  };

  it('should set props on VocabularyUsedByPanel', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyUsedByPanelContainer
        store={store}
        csid={csid}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, VocabularyUsedByPanel);

    panel.should.not.be.null;
    panel.props.data.should.equal(data);
  });
});
