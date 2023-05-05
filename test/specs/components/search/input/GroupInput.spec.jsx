import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ConfigProvider from '../../../../../src/components/config/ConfigProvider';
import GroupInput from '../../../../../src/components/search/input/GroupInput';
import { OptionPickerInput } from '../../../../../src/helpers/configContextInputs';
import { configKey, getRecordGroupOptionListName } from '../../../../../src/helpers/configHelpers';
import createTestContainer from '../../../../helpers/createTestContainer';
import { render } from '../../../../helpers/renderHelpers';

chai.should();

const mockStore = configureMockStore();
const config = {};

describe('GroupInput', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as an OptionPickerInput containing group options for the given record type and root path', () => {
    const shallowRenderer = createRenderer();

    const recordType = 'collectionobject';
    const rootPath = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

    shallowRenderer.render(
      <GroupInput
        config={config}
        recordType={recordType}
        rootPath={rootPath}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(OptionPickerInput);

    result.props.source.should.equal(getRecordGroupOptionListName(recordType, rootPath));
  });

  it('should sort options alphabetically by label', () => {
    const shallowRenderer = createRenderer();

    const recordType = 'collectionobject';

    shallowRenderer.render(
      <GroupInput
        config={config}
        recordType={recordType}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(OptionPickerInput);

    const { sortComparator } = result.props;

    const options = [
      { value: 'value1', label: 'other number' },
      { value: 'value2', label: 'dimension' },
      { value: 'value3', label: 'title' },
      { value: 'value4', label: 'technical attribute' },
    ];

    options.sort(sortComparator).should.deep.equal([
      { value: 'value2', label: 'dimension' },
      { value: 'value1', label: 'other number' },
      { value: 'value4', label: 'technical attribute' },
      { value: 'value3', label: 'title' },
    ]);
  });

  it('should render the fullName message from the supplied valueDescriptor if readOnly is true', function test() {
    const store = mockStore({
      optionList: {},
    });

    const recordType = 'collectionobject';
    const value = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

    const valueDescriptor = {
      [configKey]: {
        messages: {
          fullName: {
            id: 'fullName',
            defaultMessage: 'fullName message',
          },
          name: {
            id: 'name',
            defaultMessage: 'name message',
          },
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <GroupInput
              config={config}
              readOnly
              recordType={recordType}
              value={value}
              valueDescriptor={valueDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('fullName message');
  });

  it('should render the name message from the supplied valueDescriptor if readOnly is true and no fullName message is available', function test() {
    const store = mockStore({
      optionList: {},
    });

    const recordType = 'collectionobject';
    const value = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

    const valueDescriptor = {
      [configKey]: {
        messages: {
          name: {
            id: 'name',
            defaultMessage: 'name message',
          },
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <GroupInput
              config={config}
              readOnly
              recordType={recordType}
              value={value}
              valueDescriptor={valueDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('name message');
  });

  it('should prefer the name message from the supplied valueDescriptor if readOnly is true and the value path is the first level under the rootPath', function test() {
    const store = mockStore({
      optionList: {},
    });

    const recordType = 'loanin';
    const rootPath = 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup';
    const value = 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup/loanStatusDate';

    const valueDescriptor = {
      [configKey]: {
        messages: {
          fullName: {
            id: 'fullName',
            defaultMessage: 'fullName message',
          },
          name: {
            id: 'name',
            defaultMessage: 'name message',
          },
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <GroupInput
              config={config}
              readOnly
              recordType={recordType}
              rootPath={rootPath}
              value={value}
              valueDescriptor={valueDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('name message');
  });

  it('should fall back to the fullName message from the supplied valueDescriptor if readOnly is true and the value path is the first level under the rootPath, and the name message is not available', function test() {
    const store = mockStore({
      optionList: {},
    });

    const recordType = 'loanin';
    const rootPath = 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup';
    const value = 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup/loanStatusDate';

    const valueDescriptor = {
      [configKey]: {
        messages: {
          fullName: {
            id: 'fullName',
            defaultMessage: 'fullName message',
          },
        },
      },
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <GroupInput
              config={config}
              readOnly
              recordType={recordType}
              rootPath={rootPath}
              value={value}
              valueDescriptor={valueDescriptor}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal('fullName message');
  });

  it('should render the value if readOnly is true and no valueDescriptor is supplied', function test() {
    const store = mockStore({
      optionList: {},
    });

    const recordType = 'collectionobject';
    const value = 'ns2:collectionobjects_common/titleGroupList/titleGroup';

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <GroupInput
              config={config}
              readOnly
              recordType={recordType}
              value={value}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.equal(value);
  });
});
