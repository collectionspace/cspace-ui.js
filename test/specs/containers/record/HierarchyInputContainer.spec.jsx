import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { findWithType } from 'react-shallow-testutils';
import HierarchyInput from '../../../../src/components/record/HierarchyInput';
import HierarchyInputContainer from '../../../../src/containers/record/HierarchyInputContainer';

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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyInputContainer
        store={store}
        csid={csid}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, HierarchyInput);

    input.props.should.have.property('isRecordModified', true);
  });
});
