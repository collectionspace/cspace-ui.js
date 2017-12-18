import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
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
  formatValue: PropTypes.func,
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
        objectNumber: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.objectNumber.name',
                defaultMessage: 'message for field.objectNumber.name',
              },
            },
            required: true,
            view: {
              type: TestInput,
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
        updatedAt: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.updatedAt.name',
                defaultMessage: 'message for field.updatedAt.name',
              },
              value: {
                id: 'field.updatedAt.value',
                defaultMessage: 'formatted {value}',
              },
            },
            readOnly: true,
            view: {
              type: TestInput,
            },
          },
        },
      },
    },
  },
};

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: message => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  now: () => null,
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

  it('should set readOnly prop of the label if the field is configured to be read only', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="updatedAt" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.label.should.be.an('object');
    result.props.label.props.readOnly.should.equal(true);
  });

  it('should set required prop of the label if the field is configured to be required', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="objectNumber" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.label.should.be.an('object');
    result.props.label.props.required.should.equal(true);
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

  it('should set formatValue on the base component if it is an accepted prop of the base component and a value message is present', function test() {
    const context = {
      config,
      intl,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="updatedAt" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.formatValue.should.be.a('function');

    result.props.formatValue('something').should.equal('formatted field.updatedAt.value');
  });

  it('should set renderChildInputLabel on the base component if it is an accepted prop of the base component', function test() {
    const context = {
      config,
      recordData: Immutable.Map(),
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
