import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { getRecordTypeNameByUri } from '../../helpers/configHelpers';
import { canList, canRelate } from '../../helpers/permissionHelpers';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import SelectBar from '../search/SelectBar';
import UnrelateButton from './UnrelateButton';

const messages = defineMessages({
  title: {
    id: 'relatedRecordPanel.title',
    defaultMessage: 'Related {collectionName}',
  },
});

const listType = 'common';

const getSearchDescriptor = (props) => {
  const {
    csid,
    recordRelationUpdatedTimestamp,
    relatedRecordType,
  } = props;

  return Immutable.fromJS({
    recordType: relatedRecordType,
    searchQuery: {
      rel: csid,
      relType: 'affects',
      p: 0,
      size: 5,
    },
    seqID: recordRelationUpdatedTimestamp,
  });
};

const stopPropagation = (event) => {
  event.stopPropagation();
};

const propTypes = {
  collapsed: PropTypes.bool,
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  history: PropTypes.object,
  name: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  // This use isn't detected by eslint.
  /* eslint-disable react/no-unused-prop-types */
  recordRelationUpdatedTimestamp: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  showCheckboxColumn: PropTypes.bool,
  showAddButton: PropTypes.bool,
  clearSelected: PropTypes.func,
  setAllItemsSelected: PropTypes.func,
  unrelateRecords: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemSelectChange: PropTypes.func,
  onUnrelated: PropTypes.func,
};

const defaultProps = {
  collapsed: true,
};

export default class RelatedRecordPanel extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxCommit = this.handleCheckboxCommit.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.handleUnrelateButtonClick = this.handleUnrelateButtonClick.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.shouldShowCheckbox = this.shouldShowCheckbox.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const searchDescriptor = getSearchDescriptor(this.props);

    let nextSearchDescriptor = getSearchDescriptor(nextProps);

    if (!Immutable.is(searchDescriptor, nextSearchDescriptor)) {
      if (
        searchDescriptor.get('recordType') === nextSearchDescriptor.get('recordType') &&
        searchDescriptor.getIn(['searchQuery', 'rel']) === nextSearchDescriptor.getIn(['searchQuery', 'rel'])
      ) {
        // The record type and related csid didn't change, so carry over the page number, size, and
        // sort from the current search descriptor.

        const searchQuery = this.state.searchDescriptor.get('searchQuery');

        const nextSearchQuery = nextSearchDescriptor.get('searchQuery')
          .set('p', searchQuery.get('p'))
          .set('size', searchQuery.get('size'))
          .set('sort', searchQuery.get('sort'));

        nextSearchDescriptor = nextSearchDescriptor.set('searchQuery', nextSearchQuery);
      }

      this.setState({
        searchDescriptor: nextSearchDescriptor,
      });
    }
  }

  shouldShowCheckbox(item) {
    return (
      item.get('workflowState') !== 'locked' &&
      canRelate(getRecordTypeNameByUri(this.props.config, item.get('uri')), this.props.perms)
    );
  }

  handleCheckboxCommit(path, value) {
    const index = parseInt(path[0], 10);
    const checked = value;

    const {
      config,
      name,
      onItemSelectChange,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (onItemSelectChange) {
      onItemSelectChange(config, name, searchDescriptor, listType, index, checked);
    }
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  handleUnrelateButtonClick() {
    const {
      config,
      csid,
      name,
      recordType,
      relatedRecordType,
      selectedItems,
      clearSelected,
      unrelateRecords,
      onUnrelated,
    } = this.props;

    if (unrelateRecords) {
      const subject = {
        csid,
        recordType,
      };

      const objects = selectedItems.valueSeq().map(item => ({
        csid: item.get('csid'),
        recordType: relatedRecordType, // TODO: Check the item's docType first
      })).toJS();

      unrelateRecords(config, subject, objects, 'affects')
        .then(() => {
          if (clearSelected) {
            clearSelected(name);
          }

          if (onUnrelated) {
            onUnrelated(objects);
          }
        });
    }
  }

  renderCheckbox({ rowData, rowIndex }) {
    const {
      selectedItems,
    } = this.props;

    if (this.shouldShowCheckbox(rowData)) {
      const itemCsid = rowData.get('csid');
      const selected = selectedItems ? selectedItems.has(itemCsid) : false;

      return (
        <CheckboxInput
          name={`${rowIndex}`}
          value={selected}
          onCommit={this.handleCheckboxCommit}

          // Prevent clicking on the checkbox from selecting the record.
          onClick={stopPropagation}
        />
      );
    }

    return null;
  }

  renderTableHeader({ searchError, searchResult }) {
    const {
      config,
      name,
      selectedItems,
      showCheckboxColumn,
      setAllItemsSelected,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (searchError || !showCheckboxColumn) {
      return null;
    }

    const selectedCount = selectedItems ? selectedItems.size : 0;

    const unrelateButton = (
      <UnrelateButton
        disabled={selectedCount < 1}
        key="unrelate"
        name="unrelate"
        onClick={this.handleUnrelateButtonClick}
      />
    );

    return (
      <header>
        <SelectBar
          buttons={[unrelateButton]}
          config={config}
          listType={listType}
          searchDescriptor={searchDescriptor}
          searchName={name}
          searchResult={searchResult}
          selectedItems={selectedItems}
          setAllItemsSelected={setAllItemsSelected}
          showCheckboxFilter={this.shouldShowCheckbox}
        />
      </header>
    );
  }

  renderTitle() {
    const {
      config,
      relatedRecordType,
    } = this.props;

    const collectionNameMessage =
      get(config, ['recordTypes', relatedRecordType, 'messages', 'record', 'collectionName']);

    const collectionName = <FormattedMessage {...collectionNameMessage} />;

    return <FormattedMessage {...messages.title} values={{ collectionName }} />;
  }

  render() {
    const {
      collapsed,
      color,
      columnSetName,
      config,
      csid,
      history,
      name,
      perms,
      recordData,
      recordType,
      relatedRecordType,
      showCheckboxColumn,
      showAddButton,
      onItemClick,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    const relatedServiceType = get(
      config, ['recordTypes', relatedRecordType, 'serviceConfig', 'serviceType']
    );

    if (
      relatedServiceType === 'object' ||
      relatedServiceType === 'procedure' ||
      relatedServiceType === 'authority'
    ) {
      // Don't render if list permissions are not present for the related record type.

      if (!canList(relatedRecordType, perms)) {
        return null;
      }
    }

    if (!getUpdatedTimestamp(recordData)) {
      // Don't render until after the record has loaded.

      return null;
    }

    const renderCheckbox = showCheckboxColumn ? this.renderCheckbox : undefined;

    return (
      <SearchPanelContainer
        collapsed={collapsed}
        color={color}
        columnSetName={columnSetName}
        config={config}
        csid={csid}
        history={history}
        name={name}
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        title={this.renderTitle()}
        showAddButton={showAddButton}
        showCheckboxColumn={showCheckboxColumn}
        renderCheckbox={renderCheckbox}
        renderTableHeader={this.renderTableHeader}
        onItemClick={onItemClick}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

RelatedRecordPanel.propTypes = propTypes;
RelatedRecordPanel.defaultProps = defaultProps;
