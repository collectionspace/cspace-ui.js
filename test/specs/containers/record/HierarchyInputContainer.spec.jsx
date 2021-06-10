import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import HierarchyInput from '../../../../src/components/record/HierarchyInput';
import HierarchyInputContainer from '../../../../src/containers/record/HierarchyInputContainer';
import { findWithType } from 'react-shallow-testutils';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

describe('HierarchyInputContainer', () => {
  it('should set props on HierarchyInput', () => {
    const csid = '1234';

    const store = mockStore({
      record: Immutable.fromJS({
        [csid]: {
          data: {
            baseline: {
              document: {
                foo: 'bar',
              },
            },
            current: {
              document: {
                foo: 'baz',
              },
            },
          },
        },
      }),
    });

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInputContainer
        store={store}
        csid={csid}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, HierarchyInput);

    input.should.not.be.null;
    input.props.should.have.property('isRecordModified', true);
  });
});
