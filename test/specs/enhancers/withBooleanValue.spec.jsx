import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer } from 'react-test-renderer/shallow';

import withBooleanValue from '../../../src/enhancers/withBooleanValue';

chai.should();

describe('withBooleanValue', () => {
  const StubComponent = () => null;

  StubComponent.propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  };

  it('should convert a \'true\' value to boolean true', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value="true" />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', true);
  });

  it('should convert a \'false\' value to boolean false', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value="false" />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', false);
  });

  it('should pass a boolean true value to the base component', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', true);
  });

  it('should pass a boolean false value to the base comoponent', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value={false} />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', false);
  });

  it('should pass a null value to the base comoponent', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value={null} />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', null);
  });

  it('should pass an undefined value to the base comoponent', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value={undefined} />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', undefined);
  });

  it('should pass other string values to the base comoponent', () => {
    const EnhancedComponent = withBooleanValue(StubComponent);
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<EnhancedComponent value="foo" />);

    const result = shallowRenderer.getRenderOutput();

    result.props.should.have.property('value', 'foo');
  });
});
