import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { configKey } from '../../../../../src/helpers/configHelpers';
import BooleanConditionInput from '../../../../../src/components/search/input/BooleanConditionInput';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../../helpers/createTestContainer';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
} from '../../../../../src/constants/searchOperators';

chai.use(chaiImmutable);
chai.should();

const TestInput = props => (
  <input
    name={props.name}
    defaultValue={props.value}
    onBlur={event => props.onCommit([...props.parentPath, props.name], event.target.value)}
  />
);

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
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('BooleanConditionInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
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
            <BooleanConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

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
            <BooleanConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-input-DropdownMenuInput--common > input').value.should.equal('Any');
  });

  it('should render a field condition input for each child condition', function test() {
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
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/bar',
          value: 'value',
        },
      ],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelectorAll('.cspace-ui-FieldConditionInput--common').length.should.equal(3);
  });

  it('should call onCommit when the boolean operator is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_OR,
      value: [],
    });

    let committedCondition = null;

    const handleCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput condition={condition} onCommit={handleCommit} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('.cspace-input-DropdownMenuInput--common > input');

    Simulate.mouseDown(input);

    const menu = this.container.querySelector('.cspace-input-DropdownMenuInput--common .cspace-input-Menu--common');

    Simulate.keyDown(menu, { key: 'ArrowDown' });
    Simulate.keyPress(menu, { key: 'Enter' });

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
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/bar',
          value: 'value',
        },
      ],
    });

    let committedCondition = null;

    const handleCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <BooleanConditionInput condition={condition} onCommit={handleCommit} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const input = fieldConditionInput.querySelector('input');

    input.value = 'new val';

    Simulate.blur(input);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_OR,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/objectNumber',
          value: 'new val',
        },
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/foo',
          value: 'value',
        },
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/bar',
          value: 'value',
        },
      ],
    }));
  });
});
