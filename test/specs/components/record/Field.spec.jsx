import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { configKey } from '../../../../src/helpers/configHelpers';
import Field from '../../../../src/components/record/Field';

const expect = chai.expect;

chai.should();

const TestInput = () => <div />;

TestInput.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.string,
};

const config = {
  recordTypes: {
    object: {
      fields: {
        color: {
          [configKey]: {
            view: {
              type: TestInput,
              props: {
                foo: 'fooValue',
              },
            },
          },
        },
      },
    },
  },
};

describe('Field', function suite() {
  it('should render an element with type and props specified in config', function test() {
    const context = {
      config,
      recordType: 'object',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.foo.should.equal('fooValue');
  });

  it('should pass props to the base component', function test() {
    const context = {
      config,
      recordType: 'object',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" bar="123" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.bar.should.equal('123');
  });

  it('should not pass props to the base component that it does not accept', function test() {
    const context = {
      config,
      recordType: 'object',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" baz="123" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.should.not.have.property('baz');
  });


  it('should render nothing if the record type is not configured', function test() {
    const context = {
      config,
      recordType: 'oops',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render nothing if the field is not configured', function test() {
    const context = {
      config,
      recordType: 'object',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="oops" />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });
});
