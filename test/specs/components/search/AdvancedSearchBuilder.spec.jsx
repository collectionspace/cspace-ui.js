import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { configKey } from '../../../../src/helpers/configHelpers';
import AdvancedSearchBuilder from '../../../../src/components/search/AdvancedSearchBuilder';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import createTestContainer from '../../../helpers/createTestContainer';

import {
  OP_AND,
  OP_CONTAIN,
  OP_GROUP,
  OP_OR,
  OP_EQ,
  OP_GT,
  OP_RANGE,
} from '../../../../src/constants/searchOperators';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  optionList: Immutable.Map(),
  prefs: Immutable.Map({
    panels: {},
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
      onBlur={
        (event) => onCommit([...parentPath, name], event.target.value)
      }
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
      advancedSearch: {
        op: OP_OR,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
          },
          {
            op: OP_CONTAIN,
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

describe('AdvancedSearchBuilder', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a Panel when inline is false', function test() {
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
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should
      .match(/cspace-layout-Panel--common/);
  });

  it('should render as a condition input inline is true', function test() {
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
              inline
              recordType="collectionobject"
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should
      .match(/cspace-ui-BooleanConditionInput--common/);
  });

  it('should normalize the condition when mounted if onConditionCommit is supplied', function test() {
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
      </IntlProvider>, this.container,
    );

    committedCondition.should
      .equal(Immutable.fromJS(config.recordTypes.collectionobject.advancedSearch));
  });

  it('should normalize the condition when updated if onConditionCommit is supplied', function test() {
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
      </IntlProvider>, this.container,
    );

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
      </IntlProvider>, this.container,
    );

    committedCondition.should
      .equal(Immutable.fromJS(config.recordTypes.collectionobject.advancedSearch));
  });

  it('should normalize a non-boolean operation by wrapping it with the preferred boolean operation', function test() {
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
              preferredBooleanOp={OP_AND}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
            value: 'hello',
          },
        ],
      }));
  });

  it('should normalize an undefined condition to the default condition, and set the top-level boolean operator to the preferred boolean operator', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = undefined;

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              preferredBooleanOp={OP_AND}
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_EQ,
            path: 'ns2:collectionobjects_common/objectNumber',
          },
          {
            op: OP_CONTAIN,
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
      }));
  });

  it('should render a field condition as a FieldConditionInput if onConditionCommit is not supplied', function test() {
    const condition = Immutable.fromJS({
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/titleGroupList/titleGroup',
      value: 'value',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              preferredBooleanOp={OP_AND}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-FieldConditionInput--common').should.not.equal(null);
  });

  it('should render a group condition as a GroupConditionInput if onConditionCommit is not supplied', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: 'ns2:collectionobjects_common/titleGroupList/titleGroup',
      value: {
        op: OP_AND,
        value: [],
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <StoreProvider store={store}>
            <AdvancedSearchBuilder
              condition={condition}
              config={config}
              recordType="collectionobject"
              preferredBooleanOp={OP_AND}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-GroupConditionInput--common').should.not.equal(null);
  });

  it('should call onConditionCommit when a search condition input is committed', function test() {
    let committedCondition = null;

    const handleConditionCommit = (conditionArg) => {
      committedCondition = conditionArg;
    };

    const condition = Immutable.fromJS({
      op: OP_AND,
      value: [
        {
          op: OP_GT,
          path: 'ns2:collectionobjects_common/objectNumber',
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
              preferredBooleanOp={OP_AND}
              recordType="collectionobject"
              onConditionCommit={handleConditionCommit}
            />
          </StoreProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const input = this.container.querySelector('input[name="objectNumber"]');

    input.value = 'new val';

    Simulate.change(input);
    Simulate.blur(input);

    committedCondition.should
      .equal(Immutable.fromJS({
        op: OP_AND,
        value: [
          {
            op: OP_GT,
            path: 'ns2:collectionobjects_common/objectNumber',
            value: 'new val',
          },
        ],
      }));
  });
});
