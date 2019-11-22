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
import { configKey } from '../../../../../src/helpers/configHelpers';
import GroupConditionInput from '../../../../../src/components/search/input/GroupConditionInput';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../../helpers/createTestContainer';
import { DATA_TYPE_STRING, DATA_TYPE_INT } from '../../../../../src/constants/dataTypes';
import { getSearchConditionInputComponent } from '../../../../../src/components/search/AdvancedSearchBuilder';

import {
  OP_GROUP,
  OP_AND,
  OP_OR,
} from '../../../../../src/constants/searchOperators';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map({
    _fieldgroup_collectionobject: [
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

const TestInput = props => (
  <input
    name={props.name}
    defaultValue={props.value}
    onBlur={event => props.onCommit([...props.parentPath, props.name, 0], event.target.value)}
  />
);

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

describe('GroupConditionInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: 'ns2:collectionobjects_common/titleGroupList/titleGroup',
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <GroupConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a boolean condition input for the child condition if present', function test() {
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
          <RecordTypeProvider recordType="collectionobject">
            <GroupConditionInput
              condition={condition}
              config={config}
              recordType="collectionobject"
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-BooleanConditionInput--common').should.not.equal(null);
    this.container.querySelector('.cspace-ui-RemoveConditionButton--common').should.not.equal(null);
  });

  it('should render a short label as the header if inline is true', function test() {
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
          <RecordTypeProvider recordType="collectionobject">
            <GroupConditionInput
              condition={condition}
              config={config}
              inline
              recordType="collectionobject"
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-GroupConditionInput--common > div').textContent.should
      .equal('In ns2:collectionobjects_common/titleGroupList/titleGroup:');
  });

  it('should not render a header if readOnly is true and inline is false', function test() {
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
          <RecordTypeProvider recordType="collectionobject">
            <GroupConditionInput
              condition={condition}
              config={config}
              readOnly
              recordType="collectionobject"
              getSearchConditionInputComponent={getSearchConditionInputComponent}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-GroupConditionInput--common > div').textContent.should
      .equal('');
  });

  it('should render an editable group input if the path is null, and focus it', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <GroupConditionInput
                condition={condition}
                config={config}
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[data-name="group"]');

    input.should.not.equal(null);

    document.activeElement.should.equal(input);
  });

  it('should not render a group input if inline is true', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <GroupConditionInput
                condition={condition}
                config={config}
                inline
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.querySelector('input[data-name="group"]')).to.equal(null);
  });

  it('should call buildRecordFieldOptionLists when mounted', function test() {
    const path = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

    const condition = Immutable.fromJS({
      path,
      op: OP_GROUP,
    });

    const recordType = 'collectionobject';

    let buildConfig = null;
    let buildRecordType = null;
    let buildPath = null;
    let buildIncludeStructDateFields = null;

    const buildRecordFieldOptionLists = (
      configArg,
      recordTypeArg,
      pathArg,
      includeStructDateFieldsArg,
    ) => {
      buildConfig = configArg;
      buildRecordType = recordTypeArg;
      buildPath = pathArg;
      buildIncludeStructDateFields = includeStructDateFieldsArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType={recordType}>
              <GroupConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType={recordType}
                buildRecordFieldOptionLists={buildRecordFieldOptionLists}
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    buildConfig.should.equal(config);
    buildRecordType.should.equal(recordType);
    buildPath.should.equal(path);
    buildIncludeStructDateFields.should.equal(true);
  });

  it('should call buildRecordFieldOptionLists when the path is changed', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    const recordType = 'collectionobject';

    let buildConfig = null;
    let buildRecordType = null;
    let buildPath = null;
    let buildIncludeStructDateFields = null;

    const buildRecordFieldOptionLists = (
      configArg,
      recordTypeArg,
      pathArg,
      includeStructDateFieldsArg,
    ) => {
      buildConfig = configArg;
      buildRecordType = recordTypeArg;
      buildPath = pathArg;
      buildIncludeStructDateFields = includeStructDateFieldsArg;
    };

    const name = 'foo';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType={recordType}>
              <GroupConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType={recordType}
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const path = 'ns2:collectionobjects_common/titleGroupList/titleGroup';
    const nextCondition = condition.set('path', path);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType={recordType}>
              <GroupConditionInput
                condition={nextCondition}
                config={config}
                name={name}
                recordType={recordType}
                buildRecordFieldOptionLists={buildRecordFieldOptionLists}
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    buildConfig.should.equal(config);
    buildRecordType.should.equal(recordType);
    buildPath.should.equal(path);
    buildIncludeStructDateFields.should.equal(true);
  });

  it('should call onCommit when the group input is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
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
              <GroupConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[data-name="group"]');

    input.value = 'foo';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_GROUP,
      path: 'ns2:collectionobjects_common/foo',
      value: {
        op: OP_AND,
        value: [{ path: null }],
      },
    }));
  });

  it('should call onCommit when the child boolean condition input is committed', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: 'ns2:collectionobjects_common/foo',
      value: {
        op: OP_AND,
        value: [{ path: null }],
      },
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
              <GroupConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onCommit={handleCommit}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const input = this.container.querySelector('input[data-name="booleanSearchOp"]');

    input.value = 'Any';

    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter' });

    committedName.should.equal(name);

    committedCondition.should.equal(Immutable.fromJS({
      op: OP_GROUP,
      path: 'ns2:collectionobjects_common/foo',
      value: {
        op: OP_OR,
        value: [{ path: null }],
      },
    }));
  });

  it('should not render a remove button if readOnly is true', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <GroupConditionInput
                condition={condition}
                config={config}
                readOnly
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.querySelector('.cspace-ui-RemoveConditionButton--common')).to.equal(null);
  });

  it('should call onRemove when the remove button is clicked', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    let removedName = null;

    const name = 'foo';

    const handleRemove = (nameArg) => {
      removedName = nameArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <GroupConditionInput
                condition={condition}
                config={config}
                name={name}
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                onRemove={handleRemove}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    const button = this.container.querySelector('.cspace-ui-RemoveConditionButton--common');

    Simulate.click(button);

    removedName.should.equal(name);
  });

  it('should call deleteOptionList when unmounted', function test() {
    const condition = Immutable.fromJS({
      op: OP_GROUP,
      path: null,
    });

    const deletedNames = [];

    const deleteOptionList = (name) => {
      deletedNames.push(name);
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordTypeProvider recordType="collectionobject">
              <GroupConditionInput
                condition={condition}
                config={config}
                recordType="collectionobject"
                getSearchConditionInputComponent={getSearchConditionInputComponent}
                deleteOptionList={deleteOptionList}
              />
            </RecordTypeProvider>
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    render(
      <div />, this.container);

    deletedNames.should.deep.equal([
      '_field_collectionobject',
      '_fieldgroup_collectionobject',
    ]);
  });
});
