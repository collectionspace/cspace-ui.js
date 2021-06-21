import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { findWithType } from 'react-shallow-testutils';
import VocabularyUsedByPanel from '../../../../src/components/admin/VocabularyUsedByPanel';
import VocabularyUsedByPanelContainer from '../../../../src/containers/admin/VocabularyUsedByPanelContainer';

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

  it('should set props on VocabularyUsedByPanel', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyUsedByPanelContainer
        store={store}
        csid={csid}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, VocabularyUsedByPanel);

    panel.props.data.should.equal(data);
  });
});
