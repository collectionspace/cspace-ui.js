/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import { configKey } from '../../../../../src/helpers/configHelpers';
import BooleanConditionInput from '../../../../../src/components/search/input/BooleanConditionInput';
import { getSearchConditionInputComponent } from '../../../../../src/components/search/AdvancedSearchBuilder';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../../helpers/createTestContainer';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
  OP_GROUP,
} from '../../../../../src/constants/searchOperators';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  optionList: Immutable.Map({
    _field_loanin: [
      { value: 'field1' },
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
  value: PropTypes.string,
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
                searchView: {
                  type: TestInput,
                  props: {
                    repeating: false,
                  },
                },
              },
            },
            foo: {
              [configKey]: {
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
                  props: {
                    repeating: false,
                  },
                },
              },
            },
            bar: {
              [configKey]: {
                messages: {
                  name: {
                    id: 'name',
                    defaultMessage: 'bar name',
                  },
                },
                searchView: {
                  type: TestInput,
                  props: {
                    repeating: false,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('BooleanConditionInput', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div with condition inputs for each child condition', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:foo/bar',
          value: 'val 1',
        },
        {
          op: OP_GROUP,
          path: 'ns2:foo/baz',
          value: {
            op: OP_AND,
            value: [],
          },
        },
        {
          op: OP_OR,
          value: [],
        },
      ],
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={config}
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');

    const items = this.container.querySelectorAll('li');

    items[0].querySelector('.cspace-ui-FieldConditionInput--common').should.not.equal(null);
    items[1].querySelector('.cspace-ui-GroupConditionInput--common').should.not.equal(null);
    items[2].querySelector('.cspace-ui-BooleanConditionInput--common').should.not.equal(null);
  });

  it('should render parentheses around the child conditions when inline and showInlineParens are true', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [
        { op: OP_EQ, path: 'ns2:foo/bar', value: 'val 1' },
        { op: OP_EQ, path: 'ns2:foo/baz', value: 'val 2' },
      ],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              config={config}
              readOnly
              inline
              showInlineParens
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.match(/^\(.*\)$/);
  });

  it('should render an add group button when hasChildGroups is true', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              hasChildGroups
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('button[name="addGroup"]').should.not.equal(null);
  });

  it('should not render a remove button when readOnly is true', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              readOnly
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('.cspace-ui-RemoveConditionButton--common')).to.equal(null);
  });

  it('should not render a remove button when showRemoveButton is false', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              showRemoveButton={false}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('.cspace-ui-RemoveConditionButton--common')).to.equal(null);
  });

  it('should call onRemove when the remove button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    let removedName = null;

    const name = 'foo';

    const handleRemove = (nameArg) => {
      removedName = nameArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              name={name}
              condition={condition}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
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

  it('should focus the operator input when mounted if the condition value is null', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: null,
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="booleanSearchOp"]');

    document.activeElement.should.equal(input);
  });

  it('should have \'All\' selected in the boolean operator dropdown when an AND condition is supplied', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-DropdownMenuInput--common > input').value.should.equal('All');
  });

  it('should have \'Any\' selected in the boolean operator dropdown when an OR condition is supplied', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput
              condition={condition}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-input-DropdownMenuInput--common > input').value.should.equal('Any');
  });

  it('should call onCommit when the boolean operator is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
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
            <BooleanConditionInput
              config={{}}
              condition={condition}
              name={name}
              getSearchConditionInputComponent={getSearchConditionInputComponent}
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('.cspace-input-DropdownMenuInput--common > input');

    Simulate.mouseDown(input);

    const menu = this.container.querySelector('.cspace-input-DropdownMenuInput--common .cspace-input-Menu--common');

    Simulate.keyDown(menu, { key: 'ArrowDown' });
    Simulate.keyPress(menu, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_AND,
      value: [],
    }));
  });

  it('should call onCommit when a child condition is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/objectNumber',
          value: 'value',
        },
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/foo',
          value: 'value',
        },
        {
          path: null,
        },
      ],
    });

    let committedName = null;
    let committedCondition = null;

    const name = 'foo';

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={{}}
                name={name}
                recordType="loanin"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[data-name="field"]');

    input.value = 'field1';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/objectNumber',
          value: 'value',
        },
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/foo',
          value: 'value',
        },
        {
          path: 'field1',
        },
      ],
    }));
  });

  it('should call onCommit when the add boolean button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
    });

    let committedName = null;
    let committedCondition = null;

    const name = 'foo';

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={{}}
                name={name}
                recordType="loanin"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="addBoolean"]');

    Simulate.click(button);

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_AND,
          path: null,
          value: null,
        },
      ],
    }));
  });

  it('should call onCommit when the add field button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
    });

    let committedName = null;
    let committedCondition = null;

    const name = 'foo';

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={{}}
                name={name}
                recordType="loanin"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="addField"]');

    Simulate.click(button);

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          path: null,
        },
      ],
    }));
  });

  it('should call onCommit when the add group button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
    });

    let committedName = null;
    let committedCondition = null;

    const name = 'foo';

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={{}}
                hasChildGroups
                name={name}
                recordType="loanin"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector('button[name="addGroup"]');

    Simulate.click(button);

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_GROUP,
          path: null,
        },
      ],
    }));
  });

  it('should call onCommit when a child condition is removed', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/objectNumber',
          value: 'value',
        },
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/foo',
          value: 'value',
        },
      ],
    });

    let committedName = null;
    let committedCondition = null;

    const name = 'foo';

    const handleCommit = (nameArg, conditionArg) => {
      committedName = nameArg;
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <BooleanConditionInput
                condition={condition}
                config={{}}
                name={name}
                recordType="loanin"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    const button = this.container.querySelector(
      '.cspace-ui-FieldConditionInput--common button.cspace-ui-RemoveConditionButton--common',
    );

    Simulate.click(button);

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/foo',
          value: 'value',
        },
      ],
    }));
  });
});
