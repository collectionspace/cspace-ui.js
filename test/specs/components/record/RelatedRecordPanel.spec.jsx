/* global window */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType, findAllWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RelatedRecordPanel from '../../../../src/components/record/RelatedRecordPanel';
import ConfirmRecordUnrelateModal from '../../../../src/components/record/ConfirmRecordUnrelateModal';
import UnrelateButton from '../../../../src/components/record/UnrelateButton';
import SelectBar from '../../../../src/components/search/SelectBar';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

const recordData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      updatedAt: '2017-01-26T08:08:47.026Z',
    },
  },
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    group: {
      name: 'group',
      messages: {
        record: {
          collectionName: {
            id: 'record.group.collectionName',
            defaultMessage: 'Groups',
          },
        },
      },
      serviceConfig: {
        servicePath: 'groups',
      },
    },
    intake: {
      serviceConfig: {
        servicePath: 'intakes',
        serviceType: 'procedure',
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  group: {
    data: 'CRUDL',
  },
});

describe('RelatedRecordPanel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a search panel', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const recordRelationUpdatedTimestamp = '2017-03-06T12:05:34.000Z';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        recordRelationUpdatedTimestamp={recordRelationUpdatedTimestamp}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchPanelContainer);

    result.props.config.should.equal(config);
    result.props.recordType.should.equal(recordType);

    result.props.searchDescriptor.should.equal(Immutable.fromJS({
      recordType: relatedRecordType,
      searchQuery: {
        rel: csid,
        relType: 'affects',
        p: 0,
        size: 5,
      },
      seqID: recordRelationUpdatedTimestamp,
    }));
  });

  it('should render nothing if list permission is not present for the related record type', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'intake';
    const recordRelationUpdatedTimestamp = '2017-03-06T12:05:34.000Z';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        recordRelationUpdatedTimestamp={recordRelationUpdatedTimestamp}
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render a select bar in the panel header if showCheckboxColumn is true', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        showCheckboxColumn
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({});

    findWithType(header, SelectBar).should.not.equal(null);
  });

  it('should not render a select bar in the panel header if showCheckboxColumn is false', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        showCheckboxColumn={false}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({});

    findAllWithType(header, SelectBar).length.should.equal(0);
  });

  it('should render nothing if the record data does not contain updatedAt', function test() {
    const recordType = 'collectionobject';

    const incompleteData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {},
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        recordData={incompleteData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should rerender with the new search descriptor when it is changed within the search panel', function test() {
    const recordType = 'collectionobject';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();
    const newSearchDescriptor = Immutable.fromJS({ foo: 'bar', seqID: 'seq1234' });

    result.props.onSearchDescriptorChange(newSearchDescriptor);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.should.equal(newSearchDescriptor);
  });

  it('should rerender with a new search descriptor when a new csid is supplied via props', function test() {
    const recordType = 'collectionobject';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.searchDescriptor.getIn(['searchQuery', 'rel']).should.equal(csid);

    const newCsid = '5678';

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={newCsid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.getIn(['searchQuery', 'rel']).should.equal(newCsid);
  });

  it('should maintain the page number, size, and sort when only recordRelationUpdatedTimestamp is changed', function test() {
    const recordType = 'collectionobject';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSearchDescriptorChange(Immutable.fromJS({
      recordType: 'group',
      searchQuery: {
        rel: csid,
        p: 2,
        size: 4,
        sort: 'sortfield',
      },
    }));

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
        recordRelationUpdatedTimestamp="2017-03-27T17:56.03.000Z"
      />);

    const newResult = shallowRenderer.getRenderOutput();
    const searchQuery = newResult.props.searchDescriptor.get('searchQuery');

    searchQuery.get('p').should.equal(2);
    searchQuery.get('size').should.equal(4);
    searchQuery.get('sort').should.equal('sortfield');
  });

  it('should render checkboxes as checked for selected items', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';

    const selectedItems = Immutable.fromJS({
      1111: {},
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        perms={perms}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
      />);

    const searchPanel = shallowRenderer.getRenderOutput();

    searchPanel.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '1111', uri: '/groups/1111' }),
      rowIndex: 0,
    }).props.value.should.equal(true);

    searchPanel.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '5678', uri: '/groups/5678' }),
      rowIndex: 0,
    }).props.value.should.equal(false);
  });

  it('should not render checkboxes for locked items', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        showCheckboxColumn
      />);

    const searchPanel = shallowRenderer.getRenderOutput();

    expect(searchPanel.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '1111', workflowState: 'locked' }),
      rowIndex: 0,
    })).to.equal(null);
  });

  it('should call onItemSelectChange when a checkbox value is changed', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    let handleItemSelectChangeConfig = null;
    let handleItemSelectChangeName = null;
    let handleItemSelectChangeSearchDescriptor = null;
    let handleItemSelectChangeListType = null;
    let handleItemSelectChangeIndex = null;
    let handleItemSelectChangeChecked = null;

    const handleItemSelectChange =
      (configArg, nameArg, searchDescriptorArg, listTypeArg, indexArg, checkedArg) => {
        handleItemSelectChangeConfig = configArg;
        handleItemSelectChangeName = nameArg;
        handleItemSelectChangeSearchDescriptor = searchDescriptorArg;
        handleItemSelectChangeListType = listTypeArg;
        handleItemSelectChangeIndex = indexArg;
        handleItemSelectChangeChecked = checkedArg;
      };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        perms={perms}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        showCheckboxColumn
        onItemSelectChange={handleItemSelectChange}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();

    const checkbox = searchPanel.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '1111', uri: '/groups/1111' }),
      rowIndex: 3,
    });

    render(checkbox, this.container);

    const checkboxNode = this.container.querySelector('input');

    checkboxNode.checked = true;

    Simulate.change(checkboxNode);

    handleItemSelectChangeConfig.should.equal(config);
    handleItemSelectChangeName.should.equal(panelName);

    handleItemSelectChangeSearchDescriptor.get('recordType').should.equal(relatedRecordType);
    handleItemSelectChangeSearchDescriptor.getIn(['searchQuery', 'rel']).should.equal(csid);

    handleItemSelectChangeListType.should.equal('common');
    handleItemSelectChangeIndex.should.equal(3);
    handleItemSelectChangeChecked.should.equal(true);
  });

  it('should stop event propagation when a checkbox is clicked', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        perms={perms}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        showCheckboxColumn
      />);

    const searchPanel = shallowRenderer.getRenderOutput();

    const checkbox = searchPanel.props.renderCheckbox({
      rowData: Immutable.Map({ csid: '1111', uri: '/groups/1111' }),
      rowIndex: 0,
    });

    let clickPropagated = false;

    const handleClick = () => {
      clickPropagated = true;
    };

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    render(<div onClick={handleClick}>{checkbox}</div>, this.container);
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    const checkboxNode = this.container.querySelector('input');

    Simulate.click(checkboxNode);

    clickPropagated.should.equal(false);
  });

  it('should call openModal when the unrelate button is clicked', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: relatedRecordType },
      2222: { csid: '2222', recordType: relatedRecordType },
    });

    let openModalName = null;

    const openModal = (modalNameArg) => {
      openModalName = modalNameArg;
    };

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '5',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': [
          {
            csid: 'b0945c52-36f7-4c51-a72a',
          },
        ],
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
        openModal={openModal}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({ searchResult });

    const selectBarRenderer = createRenderer();
    const selectBar = selectBarRenderer.render(findWithType(header, SelectBar));
    const unrelateButton = findWithType(selectBar, UnrelateButton);

    unrelateButton.props.onClick();

    openModalName.should.equal(ConfirmRecordUnrelateModal.modalName);
  });

  it('should call unrelateRecords followed by clearSelected, onUnrelated, and closeModal when the confirm unrelate button is clicked', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: relatedRecordType },
      2222: { csid: '2222', recordType: relatedRecordType },
    });

    let unrelatedConfig = null;
    let unrelatedSubject = null;
    let unrelatedObjects = null;
    let unrelatedPredicate = null;

    const unrelateRecords = (configArg, subjectArg, objectsArg, predicateArg) => {
      unrelatedConfig = configArg;
      unrelatedSubject = subjectArg;
      unrelatedObjects = objectsArg;
      unrelatedPredicate = predicateArg;

      return Promise.resolve();
    };

    let clearedName = null;

    const clearSelected = (nameArg) => {
      clearedName = nameArg;
    };

    let handleUnrelatedObjects = null;

    const handleUnrelated = (objectsArg) => {
      handleUnrelatedObjects = objectsArg;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '5',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': [
          {
            csid: 'b0945c52-36f7-4c51-a72a',
          },
        ],
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
        clearSelected={clearSelected}
        unrelateRecords={unrelateRecords}
        onUnrelated={handleUnrelated}
        closeModal={closeModal}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({ searchResult });
    const confirmUnrelateModal = findWithType(header, ConfirmRecordUnrelateModal);

    confirmUnrelateModal.props.onUnrelateButtonClick();

    unrelatedConfig.should.equal(config);

    unrelatedSubject.should.deep.equal({
      csid,
      recordType,
    });

    unrelatedObjects.should.deep.equal([
      { csid: '1111', recordType: relatedRecordType },
      { csid: '2222', recordType: relatedRecordType },
    ]);

    unrelatedPredicate.should.deep.equal('affects');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        clearedName.should.equal(panelName);

        handleUnrelatedObjects.should.equal(unrelatedObjects);

        closeModalCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should set unrelate modal isUnrelating prop to true while unrelating is in progress', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: relatedRecordType },
      2222: { csid: '2222', recordType: relatedRecordType },
    });

    const unrelateRecords = () => new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 300);
    });

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '5',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': [
          {
            csid: 'b0945c52-36f7-4c51-a72a',
          },
        ],
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
        unrelateRecords={unrelateRecords}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({ searchResult });
    const confirmUnrelateModal = findWithType(header, ConfirmRecordUnrelateModal);

    confirmUnrelateModal.props.isUnrelating.should.equal(false);

    confirmUnrelateModal.props.onUnrelateButtonClick();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        // Re-render.

        shallowRenderer.render(
          <RelatedRecordPanel
            config={config}
            csid={csid}
            name={panelName}
            recordData={recordData}
            recordType={recordType}
            relatedRecordType={relatedRecordType}
            selectedItems={selectedItems}
            showCheckboxColumn
            unrelateRecords={unrelateRecords}
          />);

        const nextSearchPanel = shallowRenderer.getRenderOutput();
        const nextHeader = nextSearchPanel.props.renderTableHeader({ searchResult });
        const nextConfirmUnrelateModal = findWithType(nextHeader, ConfirmRecordUnrelateModal);

        nextConfirmUnrelateModal.props.isUnrelating.should.equal(true);

        resolve();
      }, 100);
    })
    .then(() => new Promise((resolve) => {
      window.setTimeout(() => {
        // Re-render.

        shallowRenderer.render(
          <RelatedRecordPanel
            config={config}
            csid={csid}
            name={panelName}
            recordData={recordData}
            recordType={recordType}
            relatedRecordType={relatedRecordType}
            selectedItems={selectedItems}
            showCheckboxColumn
            unrelateRecords={unrelateRecords}
          />);

        const nextSearchPanel = shallowRenderer.getRenderOutput();
        const nextHeader = nextSearchPanel.props.renderTableHeader({ searchResult });
        const nextConfirmUnrelateModal = findWithType(nextHeader, ConfirmRecordUnrelateModal);

        nextConfirmUnrelateModal.props.isUnrelating.should.equal(false);

        resolve();
      }, 300);
    }));
  });

  it('should set unrelate modal isUnrelating prop back to false if unrelating fails', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: relatedRecordType },
      2222: { csid: '2222', recordType: relatedRecordType },
    });

    const unrelateRecords = () => new Promise((resolve, reject) => {
      window.setTimeout(() => {
        reject();
      }, 300);
    });

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '5',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': [
          {
            csid: 'b0945c52-36f7-4c51-a72a',
          },
        ],
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
        unrelateRecords={unrelateRecords}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({ searchResult });
    const confirmUnrelateModal = findWithType(header, ConfirmRecordUnrelateModal);

    confirmUnrelateModal.props.isUnrelating.should.equal(false);

    confirmUnrelateModal.props.onUnrelateButtonClick();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        // Re-render.

        shallowRenderer.render(
          <RelatedRecordPanel
            config={config}
            csid={csid}
            name={panelName}
            recordData={recordData}
            recordType={recordType}
            relatedRecordType={relatedRecordType}
            selectedItems={selectedItems}
            showCheckboxColumn
            unrelateRecords={unrelateRecords}
          />);

        const nextSearchPanel = shallowRenderer.getRenderOutput();
        const nextHeader = nextSearchPanel.props.renderTableHeader({ searchResult });
        const nextConfirmUnrelateModal = findWithType(nextHeader, ConfirmRecordUnrelateModal);

        nextConfirmUnrelateModal.props.isUnrelating.should.equal(true);

        resolve();
      }, 100);
    })
    .then(() => new Promise((resolve) => {
      window.setTimeout(() => {
        // Re-render.

        shallowRenderer.render(
          <RelatedRecordPanel
            config={config}
            csid={csid}
            name={panelName}
            recordData={recordData}
            recordType={recordType}
            relatedRecordType={relatedRecordType}
            selectedItems={selectedItems}
            showCheckboxColumn
            unrelateRecords={unrelateRecords}
          />);

        const nextSearchPanel = shallowRenderer.getRenderOutput();
        const nextHeader = nextSearchPanel.props.renderTableHeader({ searchResult });
        const nextConfirmUnrelateModal = findWithType(nextHeader, ConfirmRecordUnrelateModal);

        nextConfirmUnrelateModal.props.isUnrelating.should.equal(false);

        resolve();
      }, 300);
    }));
  });

  it('should call closeModal when the cancel button is clicked in the confirm unrelate modal', function test() {
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const panelName = 'testPanel';

    const selectedItems = Immutable.fromJS({
      1111: { csid: '1111', recordType: relatedRecordType },
      2222: { csid: '2222', recordType: relatedRecordType },
    });

    const searchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '5',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': [
          {
            csid: 'b0945c52-36f7-4c51-a72a',
          },
        ],
      },
    });

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        name={panelName}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        selectedItems={selectedItems}
        showCheckboxColumn
        closeModal={closeModal}
      />);

    const searchPanel = shallowRenderer.getRenderOutput();
    const header = searchPanel.props.renderTableHeader({ searchResult });
    const confirmUnrelateModal = findWithType(header, ConfirmRecordUnrelateModal);

    confirmUnrelateModal.props.onCancelButtonClick();

    closeModalCalled.should.equal(true);
  });
});
