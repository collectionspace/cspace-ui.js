import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
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

  return {
    recordType: relatedRecordType,
    searchQuery: {
      rel: csid,
      p: 0,
      size: 5,
    },
    seqID: recordRelationUpdatedTimestamp,
  };
};

const stopPropagation = (event) => {
  event.stopPropagation();
};

const propTypes = {
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  name: PropTypes.string,
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
  unrelateRecords: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemSelectChange: PropTypes.func,
  onUnrelated: PropTypes.func,
};

export default class RelatedRecordPanel extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.handleUnrelateButtonClick = this.handleUnrelateButtonClick.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);

    this.state = {
      searchDescriptor: getSearchDescriptor(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const searchDescriptor = getSearchDescriptor(this.props);
    const nextSearchDescriptor = getSearchDescriptor(nextProps);

    if (!isEqual(searchDescriptor, nextSearchDescriptor)) {
      if (
        searchDescriptor.recordType === nextSearchDescriptor.recordType &&
        searchDescriptor.searchQuery.rel === nextSearchDescriptor.searchQuery.rel
      ) {
        // The record type and related csid didn't change, so carry over the page number, size, and
        // sort from the current search descriptor.

        const {
          p,
          size,
          sort,
        } = this.state.searchDescriptor.searchQuery;

        nextSearchDescriptor.searchQuery.p = p;
        nextSearchDescriptor.searchQuery.size = size;
        nextSearchDescriptor.searchQuery.sort = sort;
      }

      this.setState({
        searchDescriptor: nextSearchDescriptor,
      });
    }
  }

  handleCheckboxChange(event) {
    const checkbox = event.target;
    const index = parseInt(checkbox.name, 10);
    const checked = checkbox.checked;

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

    const itemCsid = rowData.get('csid');
    const selected = selectedItems ? selectedItems.has(itemCsid) : false;

    return (
      <input
        checked={selected}
        name={rowIndex}
        type="checkbox"
        onChange={this.handleCheckboxChange}

        // Prevent clicking on the checkbox from selecting the record.
        onClick={stopPropagation}
      />
    );
  }

  renderTableHeader() {
    const {
      selectedItems,
      showCheckboxColumn,
    } = this.props;

    if (!showCheckboxColumn) {
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
          selectedCount={selectedCount}
          buttons={[unrelateButton]}
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
      color,
      columnSetName,
      config,
      csid,
      name,
      recordData,
      recordType,
      showCheckboxColumn,
      showAddButton,
      onItemClick,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (!getUpdatedTimestamp(recordData)) {
      // Don't render until after the record has loaded.

      return null;
    }

    const renderCheckbox = showCheckboxColumn ? this.renderCheckbox : undefined;

    return (
      <SearchPanelContainer
        color={color}
        columnSetName={columnSetName}
        config={config}
        csid={csid}
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
