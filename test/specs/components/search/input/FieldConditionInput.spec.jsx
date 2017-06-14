import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { configKey } from '../../../../../src/helpers/configHelpers';
import FieldConditionInput from '../../../../../src/components/search/input/FieldConditionInput';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../../helpers/createTestContainer';

import {
  OP_EQ,
  OP_RANGE,
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

describe('FieldConditionInput', function suite() {
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
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

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
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('objectNumber');
    divs[1].textContent.should.equal('is');
    divs[2].querySelector('input').should.not.equal(null);
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
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

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
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('bar name');
  });

  it('should fall back to the field name if neither fullName nor name are provided', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[0].textContent.should.equal('objectNumber');
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
            <FieldConditionInput condition={condition} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const fieldConditionInput = this.container.querySelector('.cspace-ui-FieldConditionInput--common');
    const divs = fieldConditionInput.querySelectorAll('div');

    divs[2].querySelectorAll('input').length.should.equal(2);
  });

  it('should call onCommit when the search field is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'value',
    });

    let committedCondition = null;

    const handleCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <FieldConditionInput condition={condition} onCommit={handleCommit} />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input');

    input.value = 'new val';

    Simulate.blur(input);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'new val',
    }));
  });
});
