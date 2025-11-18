/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { configKey } from '../../../../../src/helpers/configHelpers';
import FieldConditionInput from '../../../../../src/components/search/input/FieldConditionInput';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../../helpers/createTestContainer';
import { render } from '../../../../helpers/renderHelpers';
import { DATA_TYPE_STRING, DATA_TYPE_INT } from '../../../../../src/constants/dataTypes';

import {
  OP_EQ,
  OP_GT,
  OP_RANGE,
  OP_NULL,
  OP_CONTAIN,
} from '../../../../../src/constants/searchOperators';
import { OP_NOT_EQ } from '../../../../../lib/constants/searchOperators';
import { DATA_TYPE_DATE } from '../../../../../lib/constants/dataTypes';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map({
    _field_collectionobject: [
      {
        message: {
          id: 'field.foo.name',
          defaultMessage: 'foo',
        },
        value: 'ns2:collectionobjects_common/foo',
      },
    ],
  }),
});

const TestInput = (props) => {
  const {
    name,
    parentPath,
    value,
    onCommit,
  } = props;

  return (
    <input
      name={name}
      defaultValue={value}
      onBlur={(event) => onCommit([...parentPath, name, 0], event.target.value)}
    />
  );
};

TestInput.propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.string,
  ]),
  onCommit: PropTypes.func,
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: {
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: {
              [configKey]: {
                dataType: DATA_TYPE_DATE,
                searchView: {
                  type: TestInput,
                },
              },
            },
            foo: {
              [configKey]: {
                dataType: DATA_TYPE_STRING,
                messages: {
                  fullName: {
                    id: 'fullName',
                    defaultMessage: 'foo fullName',
                  },
                  name: {
                    id: 'name',
                    defaultMessage: 'foo name',
                  },
                },
                searchView: {
                  type: TestInput,
                },
              },
            },
            bar: {
              [configKey]: {
                dataType: DATA_TYPE_INT,
                messages: {
                  name: {
                    id: 'name',
                    defaultMessage: 'bar name',
                  },
                },
                searchView: {
                  type: TestInput,
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('FieldConditionInput', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a field, operation, and value', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('ns2:collectionobjects_common/objectNumber');
    divs[1].querySelector('input').value.should.equal('is');
    divs[2].querySelector('input').should.not.equal(null);
  });

  it('should render the operator as ellipses when the path is null', function test() {
    const condition = Immutable.fromJS({
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <FieldConditionInput
                condition={condition}
                config={config}
                recordType="collectionobject"
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[1].textContent.should.equal('...');
  });

  it('should not render a field when the path is null and inline is true', function test() {
    const condition = Immutable.fromJS({
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              inline
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');

    fieldConditionInput.querySelector('div').textContent.should.equal('');
  });

  it('should not render a value when a field descriptor is not found for the path', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/foobar',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('input[name="foobar"]')).to.equal(null);
  });

  it('should not render a remove button when readOnly is true', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              readOnly
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('.cspace-ui-RemoveConditionButton--common')).to.equal(null);
  });

  it('should prefer the fullName message for the field label', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/foo',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('foo fullName');
  });

  it('should fall back to the name message if fullName is not provided', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/bar',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('bar name');
  });

  it('should fall back to the field path if neither fullName nor name are provided', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('ns2:collectionobjects_common/objectNumber');
  });

  it('should render a range input for range conditions', function test() {
    const condition = Immutable.fromJS({
      op: OP_RANGE,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: ['1', '2'],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[2].querySelectorAll('input').length.should.equal(2);
  });

  it('should call onCommit when the field input is committed', function test() {
    const condition = Immutable.fromJS({
      path: null,
    });

    let committedName = null;
    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <FieldConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType="collectionobject"
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="field"]');

    input.value = 'foo';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      path: 'ns2:collectionobjects_common/foo',
    }));
  });

  it('should call onCommit when the value input is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    let committedName = null;
    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              name={name}
              recordType="collectionobject"
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[name="objectNumber"]');

    input.value = 'new val';

    Simulate.blur(input);

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: ['new val'],
    }));
  });

  it('should call onCommit when the operator input is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_NOT_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    let committedName = null;
    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              name={name}
              recordType="collectionobject"
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="searchOp"]');

    input.value = 'is';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    }));
  });

  it('should call onRemove when the remove button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    let removedName = null;

    const handleRemove = (nameArg) => {
      removedName = nameArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              name={name}
              recordType="collectionobject"
              onRemove={handleRemove}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('.cspace-ui-RemoveConditionButton--common');

    Simulate.click(button);

    removedName.should.equal(name);
  });

  it('should remove all values except the first when a new operator is selected that does not support multiple values', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: ['value1', 'value2', 'value3'],
    });

    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="searchOp"]');

    input.value = 'is greater than';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_GT,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value1',
    }));
  });

  it('should remove all values when a new operator is selected that does not support a value', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: ['value1', 'value2', 'value3'],
    });

    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="searchOp"]');

    input.value = 'is blank';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_NULL,
      path: 'ns2:collectionobjects_common/objectNumber',
    }));
  });

  it('should select the first valid operator when a new field is selected that does not support the current operator', function test() {
    const condition = Immutable.fromJS({
      op: OP_CONTAIN,
      path: 'ns2:collectionobjects_common/foo',
      value: ['value'],
    });

    let committedCondition = null;

    const handleCommit = (nameArg, conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const nextCondition = condition.set('path', 'ns2:collectionobjects_common/bar');

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput
              condition={nextCondition}
              config={config}
              recordType="collectionobject"
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/bar',
      value: ['value'],
    }));
  });

  it('should focus the operator input when the path changes from null to non-null', function test() {
    const condition = Immutable.fromJS({
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <FieldConditionInput
                condition={condition}
                config={config}
                recordType="collectionobject"
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const nextCondition = condition.set('path', 'ns2:collectionobjects_common/bar');

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <FieldConditionInput
                condition={nextCondition}
                config={config}
                recordType="collectionobject"
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="searchOp"]');

    document.activeElement.should.equal(input);
  });
});
