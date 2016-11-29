import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import withRecordPlugins from '../../../src/enhancers/withRecordPlugins';

chai.should();

describe('withRecordPlugins', function suite() {
  context('enhanced component', function context() {
    it('should set recordPlugins prop on the base component with recordPlugins from context', function test() {
      const recordPlugins = {
        object: {},
      };

      const reactContext = {
        recordPlugins,
      };

      const StubComponent = () => null;
      const EnhancedComponent = withRecordPlugins(StubComponent);
      const shallowRenderer = createRenderer();

      shallowRenderer.render(<EnhancedComponent />, reactContext);

      const result = shallowRenderer.getRenderOutput();

      result.props.should.have.property('recordPlugins', recordPlugins);
    });
  });
});
