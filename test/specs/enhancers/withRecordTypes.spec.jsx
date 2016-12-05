import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import withRecordTypes from '../../../src/enhancers/withRecordTypes';

chai.should();

describe('withRecordTypes', function suite() {
  context('enhanced component', function context() {
    it('should set recordTypes prop on the base component with recordTypes from context', function test() {
      const recordTypes = {
        object: {},
      };

      const reactContext = {
        recordTypes,
      };

      const StubComponent = () => null;
      const EnhancedComponent = withRecordTypes(StubComponent);
      const shallowRenderer = createRenderer();

      shallowRenderer.render(<EnhancedComponent />, reactContext);

      const result = shallowRenderer.getRenderOutput();

      result.props.should.have.property('recordTypes', recordTypes);
    });
  });
});
