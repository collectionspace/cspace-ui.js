import React from 'react';
import PropTypes from 'prop-types';
import { createRenderer } from 'react-test-renderer/shallow';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { DateInput, StructuredDateInput } from '../../../../src/helpers/configContextInputs';
import { configKey } from '../../../../src/helpers/configHelpers';
import Field from '../../../../src/components/record/Field';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

const { expect } = chai;

chai.should();

const TestInput = () => <div />;

TestInput.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  foo: PropTypes.string,
  bar: PropTypes.string,
  label: PropTypes.node,
  formatValue: PropTypes.func,
  viewType: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
};

const CompoundTestInput = () => <div />;

CompoundTestInput.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
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
        fieldCollectionDateGroup: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.fieldCollectionDateGroup.name',
                defaultMessage: 'message for field.fieldCollectionDateGroup.name',
              },
            },
            view: {
              type: StructuredDateInput,
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
            view: {
              type: TestInput,
              props: {
                readOnly: true,
              },
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
  formatMessage: (message) => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  now: () => null,
};

describe('Field', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render an element with type and props specified in config', () => {
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

  it('should pass props to the base component', () => {
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

  it('should set repeating on the base component if the field is repeating', () => {
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
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('message for field.color.name');
  });

  it('should set readOnly prop of the label if the field view is configured to be read only', () => {
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

  it('should set required prop of the label if the field is configured to be required', () => {
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

  it('should set label to null on the base component if no message is found', () => {
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

  it('should set formatValue on the base component if it is an accepted prop of the base component and a value message is present', () => {
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
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('message for field.title.name');
  });

  it('should set viewType on the base component if it is an accepted prop of the base component', () => {
    const context = {
      config,
      intl,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="updatedAt" viewType="foo" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(TestInput);
    result.props.viewType.should.equal('foo');
  });

  it('should not pass props to the base component that it does not accept', () => {
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

  it('should render a DateInput as the search view for field whose view is a StructuredDateInput, if no search view is explicitly configured', () => {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="fieldCollectionDateGroup" viewType="search" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(DateInput);
  });

  it('should render nothing if the record type is not configured', () => {
    const context = {
      config,
      recordType: 'oops',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<Field name="color" />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render nothing if the field is not configured', () => {
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
