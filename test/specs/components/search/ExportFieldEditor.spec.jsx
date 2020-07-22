import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { components as inputComponents } from 'cspace-input';
import ExportFieldEditor from '../../../../src/components/search/ExportFieldEditor';
import FieldInput from '../../../../src/components/search/input/FieldInput';
import createTestContainer from '../../../helpers/createTestContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

import {
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../../../src/helpers/configHelpers';

const { RepeatingInput } = inputComponents;

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  optionList: Immutable.Map(),
});

describe('ExportFieldEditor', () => {
  const config = {};

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div containing a RepeatingInput containing a FieldInput', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportFieldEditor config={config} />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');

    const repeatingInput = findWithType(result, RepeatingInput);

    repeatingInput.should.not.equal(null);

    findWithType(repeatingInput, FieldInput).should.not.equal(null);
  });

  it('should call buildRecordFieldOptionLists when mounted', function test() {
    const recordType = 'group';

    let buildRecordFieldOptionListsConfig = null;
    let buildRecordFieldOptionListsRecordType = null;

    const buildRecordFieldOptionLists = (configArg, recordTypeArg) => {
      buildRecordFieldOptionListsConfig = configArg;
      buildRecordFieldOptionListsRecordType = recordTypeArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <ExportFieldEditor
              config={config}
              recordType={recordType}
              buildRecordFieldOptionLists={buildRecordFieldOptionLists}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    buildRecordFieldOptionListsConfig.should.equal(config);
    buildRecordFieldOptionListsRecordType.should.equal(recordType);
  });

  it('should call deleteOptionList twice when unmounted', function test() {
    const recordType = 'group';
    const deleteOptionListNames = [];

    const deleteOptionList = (nameArg) => {
      deleteOptionListNames.push(nameArg);
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <ExportFieldEditor
              config={config}
              recordType={recordType}
              deleteOptionList={deleteOptionList}
            />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    render(<div />, this.container);

    deleteOptionListNames.should.deep.equal([
      getRecordFieldOptionListName(recordType),
      getRecordGroupOptionListName(recordType),
    ]);
  });

  it('should call onIncludeFieldsAddInstance when an instance is added in the repeating input', () => {
    let addedPosition = null;

    const handleIncludeFieldsAddInstance = (positionArg) => {
      addedPosition = positionArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportFieldEditor
        config={config}
        onIncludeFieldsAddInstance={handleIncludeFieldsAddInstance}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const repeatingInput = findWithType(result, RepeatingInput);

    const position = 3;

    repeatingInput.props.onAddInstance(['fields'], position);

    addedPosition.should.equal(position);
  });

  it('should call onIncludeFieldsCommit when a value is committed in the repeating input', () => {
    let committedPosition = null;
    let committedValue = null;

    const handleIncludeFieldsCommit = (positionArg, valueArg) => {
      committedPosition = positionArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportFieldEditor
        config={config}
        onIncludeFieldsCommit={handleIncludeFieldsCommit}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const repeatingInput = findWithType(result, RepeatingInput);

    const position = 1;
    const value = 'foo';

    repeatingInput.props.onCommit([position], value);

    committedPosition.should.equal(position);
    committedValue.should.equal(value);
  });

  it('should call onIncludeFieldsMoveInstance when an instance is moved in the repeating input', () => {
    let movedFromPosition = null;
    let movedToPosition = null;

    const handleIncludeFieldsMoveInstance = (fromPositionArg, toPositionArg) => {
      movedFromPosition = fromPositionArg;
      movedToPosition = toPositionArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportFieldEditor
        config={config}
        onIncludeFieldsMoveInstance={handleIncludeFieldsMoveInstance}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const repeatingInput = findWithType(result, RepeatingInput);

    const fromPosition = 3;
    const toPosition = 0;

    repeatingInput.props.onMoveInstance(['fields', fromPosition], toPosition);

    movedFromPosition.should.equal(fromPosition);
    movedToPosition.should.equal(toPosition);
  });

  it('should call onIncludeFieldsRemoveInstance when an instance is removed in the repeating input', () => {
    let removedPosition = null;

    const handleIncludeFieldsRemoveInstance = (positionArg) => {
      removedPosition = positionArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportFieldEditor
        config={config}
        onIncludeFieldsRemoveInstance={handleIncludeFieldsRemoveInstance}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const repeatingInput = findWithType(result, RepeatingInput);

    const position = 4;

    repeatingInput.props.onRemoveInstance(['fields', position]);

    removedPosition.should.equal(position);
  });
});
