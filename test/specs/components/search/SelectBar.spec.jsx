import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType, findAllWithType } from 'react-shallow-testutils';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import SelectBar from '../../../../src/components/search/SelectBar';

const expect = chai.expect;

chai.should();

const searchName = 'testSearch';
const listType = 'common';

const config = {
  listTypes: {
    [listType]: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
};

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    itemsInPage: '3',
    totalItems: '3',
    pageNum: '0',
    pageSize: '3',
    'list-item': [
      {
        csid: '1111',
      },
      {
        csid: '2222',
      },
      {
        csid: '3333',
      },
    ],
  },
});

describe('SelectBar', function suite() {
  it('should render a checkbox and a message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findWithType(result, CheckboxInput).should.not.equal(null);
    findWithType(result, FormattedMessage).should.not.equal(null);
  });

  it('should render nothing if no search result is supplied', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render nothing if search result contains no items', function test() {
    const emptyResult = Immutable.fromJS({
      'ns2:abstract-common-list': {},
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={emptyResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render buttons supplied via props', function test() {
    const buttons = [
      <button key="1" />,
      <button key="2" />,
    ];

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
        buttons={buttons}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, 'button').should.have.lengthOf(2);
  });

  it('should render the checkbox as checked when all items are selected', function test() {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: {},
      2222: {},
      3333: {},
    });

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
        selectedItems={selectedItems}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    checkbox.props.value.should.equal(true);
  });

  it('should render the checkbox as unchecked when no items are selected', function test() {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({});

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
        selectedItems={selectedItems}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    checkbox.props.value.should.equal(false);
  });

  it('should render the checkbox as indeterminate when some but not all items are selected', function test() {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: {},
    });

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
        selectedItems={selectedItems}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    expect(checkbox.props.value).to.equal(null);
  });

  it('should render the checkbox correctly when there is a single (non-list) result item', function test() {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: {},
    });

    const singleItemSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        itemsInPage: '3',
        totalItems: '3',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    });

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={singleItemSearchResult}
        selectedItems={selectedItems}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    expect(checkbox.props.value).to.equal(true);
  });

  it('should use showCheckboxFilter to determine the items to consider when calculating the checkbox state', function test() {
    const shallowRenderer = createRenderer();

    const selectedItems = Immutable.fromJS({
      1111: {},
    });

    const showCheckboxFilter = item => item.get('csid') === '1111';

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchResult={searchResult}
        selectedItems={selectedItems}
        showCheckboxFilter={showCheckboxFilter}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    checkbox.props.value.should.equal(true);
  });

  it('should call setAllItemsSelected when the checkbox value is committed', function test() {
    let setConfig = null;
    let setSearchName = null;
    let setSearchDescriptor = null;
    let setListType = null;
    let setValue = null;
    let setShowCheckboxFilter = null;

    const setAllItemsSelected = (
      configArg, searchNameArg, searchDescriptorArg, listTypeArg, valueArg, showCheckboxFilterArg
    ) => {
      setConfig = configArg;
      setSearchName = searchNameArg;
      setSearchDescriptor = searchDescriptorArg;
      setListType = listTypeArg;
      setValue = valueArg;
      setShowCheckboxFilter = showCheckboxFilterArg;
    };

    const searchDescriptor = {};
    const showCheckboxFilter = () => true;

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SelectBar
        config={config}
        listType={listType}
        searchDescriptor={searchDescriptor}
        searchName={searchName}
        searchResult={searchResult}
        setAllItemsSelected={setAllItemsSelected}
        showCheckboxFilter={showCheckboxFilter}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const checkbox = findWithType(result, CheckboxInput);

    const path = [];
    const checked = true;

    checkbox.props.onCommit(path, checked);

    setConfig.should.equal(config);
    setSearchName.should.equal(searchName);
    setSearchDescriptor.should.equal(searchDescriptor);
    setListType.should.equal(listType);
    setValue.should.equal(checked);
    setShowCheckboxFilter.should.equal(showCheckboxFilter);
  });
});
