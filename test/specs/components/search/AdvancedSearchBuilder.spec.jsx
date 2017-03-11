import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { configKey } from '../../../../src/helpers/configHelpers';
import AdvancedSearchBuilder from '../../../../src/components/search/AdvancedSearchBuilder';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import createTestContainer from '../../../helpers/createTestContainer';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
  OP_LTE,
  OP_GTE,
  OP_RANGE,
} from '../../../../src/constants/searchOperators';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map({
    panels: {},
  }),
});

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
      advancedSearch: {
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
          },
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/foo',
          },
          {
            op: OP_RANGE,
            path: 'ns2:collectionobjects_common/bar',
          },
        ],
      },
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

describe('AdvancedSearchBuilder', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a Panel', function test() {
    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.match(/cspace-layout-Panel--common/);
  });

  it('should call onConditionCommit when mounted', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS(config.recordTypes.collectionobject.advancedSearch));
  });

  it('should call onConditionCommit when updated', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              config={config}
              recordType="collectionobject"
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS(config.recordTypes.collectionobject.advancedSearch));
  });

  it('should merge the passed condition into the default condition for the record type', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [
        {
          op: OP_EQ,
          path: 'ns2:collectionobjects_common/objectNumber',
          value: 'hello',
        },
      ],
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
            value: 'hello',
          },
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/foo',
          },
          {
            op: OP_RANGE,
            path: 'ns2:collectionobjects_common/bar',
          },
        ],
      }));
  });

  it('should merge a non-boolean passed condition into the child conditions of the default condition', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/objectNumber',
      value: 'hello',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
            value: 'hello',
          },
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/foo',
          },
          {
            op: OP_RANGE,
            path: 'ns2:collectionobjects_common/bar',
          },
        ],
      }));
  });

  it('should merge <= operations into range operations', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = Immutable.fromJS({
      op: OP_LTE,
      path: 'ns2:collectionobjects_common/bar',
      value: 'abc',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
          },
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/foo',
          },
          {
            op: OP_RANGE,
            path: 'ns2:collectionobjects_common/bar',
            value: [undefined, 'abc'],
          },
        ],
      }));
  });

  it('should merge >= operations into range operations', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = Immutable.fromJS({
      op: OP_GTE,
      path: 'ns2:collectionobjects_common/bar',
      value: 'abc',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
          },
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/foo',
          },
          {
            op: OP_RANGE,
            path: 'ns2:collectionobjects_common/bar',
            value: ['abc'],
          },
        ],
      }));
  });
});
