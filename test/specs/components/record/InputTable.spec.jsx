import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { IntlProvider } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { configKey } from '../../../../src/helpers/configHelpers';
import InputTable from '../../../../src/components/record/InputTable';
import createTestContainer from '../../../helpers/createTestContainer';

const {
  InputTable: BaseInputTable,
} = inputComponents;

chai.should();

const TestInput = () => <div />;

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        inputTable: {
          age: {
            id: 'inputTable.collectionobject.age',
            defaultMessage: 'message for inputTable.collectionobject.age',
          },
        },
      },
      fields: {
        ageValue: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.ageValue.name',
                defaultMessage: 'message for field.ageValue.name',
              },
            },
            view: {
              type: TestInput,
            },
          },
        },
        computedCurrentLocation: {
          [configKey]: {
            messages: {
              name: {
                id: 'field.computedCurrentLocation.name',
                defaultMessage: 'message for field.computedCurrentLocation.name',
              },
            },
            readOnly: true,
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
          },
        },
      },
    },
  },
};

describe('InputTable', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a cspace-input InputTable', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<InputTable />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BaseInputTable);
  });

  it('should set the label prop on the base InputTable', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<InputTable name="age" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BaseInputTable);
    result.props.label.should.be.an('object');

    render(
      <IntlProvider locale="en">
        {result.props.label}
      </IntlProvider>, this.container);

    this.container.textContent.should.equal('message for inputTable.collectionobject.age');
  });

  it('should set the renderLabel prop on the base InputTable', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InputTable name="age" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BaseInputTable);
    result.props.renderLabel.should.be.a('function');

    const childInput = <TestInput name="ageValue" />;
    const label = result.props.renderLabel(childInput);

    render(
      <IntlProvider locale="en">
        {label}
      </IntlProvider>, this.container);

    this.container.textContent.should.equal('message for field.ageValue.name');
  });

  it('should set readOnly to true on field labels for child inputs that are configured as read only', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InputTable />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BaseInputTable);
    result.props.renderLabel.should.be.a('function');

    const childInput = <TestInput name="computedCurrentLocation" />;
    const label = result.props.renderLabel(childInput);

    label.props.readOnly.should.equal(true);
  });

  it('should set required to true on field labels for child inputs that configured as required', function test() {
    const context = {
      config,
      recordType: 'collectionobject',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InputTable />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(BaseInputTable);
    result.props.renderLabel.should.be.a('function');

    const childInput = <TestInput name="objectNumber" />;
    const label = result.props.renderLabel(childInput);

    label.props.required.should.equal(true);
  });
});
