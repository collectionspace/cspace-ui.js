import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { configKey } from '../../../../src/helpers/configHelpers';
import Field from '../../../../src/components/record/Field';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

const TestInput = () => <div />;

TestInput.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.string,
  label: PropTypes.node,
};

const CompoundTestInput = () => <div />;

CompoundTestInput.propTypes = {
  renderChildInputLabel: PropTypes.func,
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: {
        color: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.color.name',
                defaultMessage: 'message for field.color.name',
              },
            },
            view: {
              type: TestInput,
              props: {
                foo: 'fooValue',
              },
            },
          },
        },
        comments: {
          comment: {
            [configKey]: {
              repeating: true,
              view: {
                type: TestInput,
                props: {
                  foo: 'fooValue',
                },
              },
            },
          },
        },
        titleGroup: {
          [configKey]: {
            view: {
              type: CompoundTestInput,
            },
          },
          title: {
            [configKey]: {
              messages: {
                name: {
                  id: 'field.title.name',
                  defaultMessage: 'message for field.title.name',
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('Field', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render an element with type and props specified in config', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
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
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" bar="123" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.bar.should.equal('123');
  });

  it('should set repeating on the base component if the field is repeating', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="comment" subpath="comments" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.repeating.should.equal(true);
  });

  it('should set label on the base component if it is an accepted prop of the base component', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.label.should.be.an('object');

    render(
      <IntlProvider locale="en">
        {result.props.label}
      </IntlProvider>, this.container);

    this.container.textContent.should.equal('message for field.color.name');
  });

  it('should set label to null on the base component if no message is found', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="comment" subpath="comments" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    expect(result.props.label).to.equal(null);
  });

  it('should set renderChildInputLabel on the base component if it is an accepted prop of the base component', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="titleGroup" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(CompoundTestInput);
    result.props.renderChildInputLabel.should.be.a('function');

    const childInput = <TestInput name="title" />;
    const label = result.props.renderChildInputLabel(childInput);

    render(
      <IntlProvider locale="en">
        {label}
      </IntlProvider>, this.container);

    this.container.textContent.should.equal('message for field.title.name');
  });

  it('should not pass props to the base component that it does not accept', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
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
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="oops" />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });
});
