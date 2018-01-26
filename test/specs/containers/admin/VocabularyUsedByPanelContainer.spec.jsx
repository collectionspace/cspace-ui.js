import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import VocabularyUsedByPanel from '../../../../src/components/admin/VocabularyUsedByPanel';
import VocabularyUsedByPanelContainer from '../../../../src/containers/admin/VocabularyUsedByPanelContainer';

chai.should();

const mockStore = configureMockStore();

describe('VocabularyUsedByPanelContainer', function suite() {
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

  it('should set props on VocabularyUsedByPanel', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <VocabularyUsedByPanelContainer csid={csid} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(VocabularyUsedByPanel);
    result.props.data.should.equal(data);
  });
});
