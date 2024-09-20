import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import { getRecordTypeNameByUri } from '../../helpers/configHelpers';
import { canList, canUnrelate } from '../../helpers/permissionHelpers';
import { getUpdatedTimestamp } from '../../helpers/recordDataHelpers';
import { MODAL_CONFIRM_RECORD_UNRELATE } from '../../constants/modalNames';
import SearchPanelContainer from '../../containers/search/SearchPanelContainer';
import ConfirmRecordUnrelateModal from './ConfirmRecordUnrelateModal';
import SelectBar from '../search/SelectBar';
import UnrelateButton from './UnrelateButton';

export const confirmUnrelateModalName = `RelatedRecordPanel-${MODAL_CONFIRM_RECORD_UNRELATE}`;

const messages = defineMessages({
  title: {
    id: 'relatedRecordPanel.title',
    defaultMessage: 'Related {collectionName}',
  },
});

const getSearchDescriptor = (props) => {
  const {
    config,
    csid,
    initialSort,
    recordRelationUpdatedTimestamp,
    relatedRecordType,
    serviceTag,
  } = props;

  return Immutable.fromJS({
    recordType: relatedRecordType,
    searchQuery: {
      rel: csid,
      relType: 'affects',
      p: 0,
      size: config.defaultSearchPanelSize || 5,
      sort: initialSort,
      serviceTag,
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
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  listType: PropTypes.string,
  linkItems: PropTypes.bool,
  name: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordData: PropTypes.instanceOf(Immutable.Map),
  // These uses aren't detected by eslint.
  /* eslint-disable react/no-unused-prop-types */
  initialSort: PropTypes.string,
  recordRelationUpdatedTimestamp: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  serviceTag: PropTypes.string,
  showCheckboxColumn: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  showAddButton: PropTypes.bool,
  panelId: PropTypes.string, // not set on this prop name yet
  openModalName: PropTypes.string,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  clearSelected: PropTypes.func,
  setAllItemsSelected: PropTypes.func,
  unrelateRecords: PropTypes.func,
  getItemLocation: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemSelectChange: PropTypes.func,
  onUnrelated: PropTypes.func,
};

const defaultProps = {
  collapsed: true,
  listType: 'common',
};

export default class RelatedRecordPanel extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxCommit = this.handleCheckboxCommit.bind(this);
    this.handleConfirmUnrelateButtonClick = this.handleConfirmUnrelateButtonClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleSearchDescriptorChange = this.handleSearchDescriptorChange.bind(this);
    this.handleUnrelateButtonClick = this.handleUnrelateButtonClick.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.shouldShowCheckbox = this.shouldShowCheckbox.bind(this);

    this.state = {
      isUnrelating: false,
      searchDescriptor: getSearchDescriptor(props),
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const searchDescriptor = getSearchDescriptor(this.props);

    let nextSearchDescriptor = getSearchDescriptor(nextProps);

    if (!Immutable.is(searchDescriptor, nextSearchDescriptor)) {
      if (
        searchDescriptor.get('recordType') === nextSearchDescriptor.get('recordType')
        && searchDescriptor.getIn(['searchQuery', 'rel']) === nextSearchDescriptor.getIn(['searchQuery', 'rel'])
      ) {
        // The record type and related csid didn't change, so carry over the page number, size, and
        // sort from the current search descriptor.

        const {
          searchDescriptor: currentSearchDescriptor,
        } = this.state;

        const searchQuery = currentSearchDescriptor.get('searchQuery');

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

  handleCheckboxCommit(path, value) {
    const index = parseInt(path[0], 10);
    const checked = value;

    const {
      config,
      name,
      listType,
      onItemSelectChange,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (onItemSelectChange) {
      onItemSelectChange(config, name, searchDescriptor, listType, index, checked);
    }
  }

  handleConfirmUnrelateButtonClick() {
    const {
      config,
      csid,
      name,
      recordType,
      relatedRecordType,
      selectedItems,
      clearSelected,
      closeModal,
      unrelateRecords,
      onUnrelated,
    } = this.props;

    if (unrelateRecords) {
      this.setState({
        isUnrelating: true,
      });

      const subject = {
        csid,
        recordType,
      };

      const objects = selectedItems.valueSeq().map((item) => ({
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

          if (closeModal) {
            closeModal(false);
          }

          this.setState({
            isUnrelating: false,
          });
        })
        .catch(() => {
          this.setState({
            isUnrelating: false,
          });
        });
    }
  }

  handleModalCancelButtonClick() {
    const {
      closeModal,
    } = this.props;

    if (closeModal) {
      closeModal(false);
    }
  }

  handleSearchDescriptorChange(searchDescriptor) {
    this.setState({
      searchDescriptor,
    });
  }

  handleUnrelateButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(confirmUnrelateModalName);
    }
  }

  shouldShowCheckbox(item) {
    const {
      config,
      perms,
    } = this.props;

    return (
      item.get('workflowState') !== 'locked'
      && canUnrelate(getRecordTypeNameByUri(config, item.get('uri')), perms, config)
    );
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
          embedded
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

  renderConfirmRecordUnrelateModal() {
    const {
      config,
      openModalName,
      relatedRecordType,
      selectedItems,
    } = this.props;

    const {
      isUnrelating,
    } = this.state;

    const recordCount = selectedItems ? selectedItems.size : 0;

    return (
      <ConfirmRecordUnrelateModal
        config={config}
        recordType={relatedRecordType}
        isMultiSelect
        isOpen={openModalName === confirmUnrelateModalName}
        isUnrelating={isUnrelating}
        recordCount={recordCount}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onUnrelateButtonClick={this.handleConfirmUnrelateButtonClick}
      />
    );
  }

  renderTableHeader({ searchError, searchResult }) {
    const {
      config,
      name,
      perms,
      listType,
      relatedRecordType,
      selectedItems,
      showCheckboxColumn,
      setAllItemsSelected,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    if (searchError || !showCheckboxColumn || !canUnrelate(relatedRecordType, perms, config)) {
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
        {this.renderConfirmRecordUnrelateModal()}
      </header>
    );
  }

  renderTitle() {
    const {
      config,
      recordType,
      relatedRecordType,
      panelId,
    } = this.props;

    const sidebarMessage = get(config, ['recordTypes', recordType, 'messages', 'sidebar', panelId]);
    const collectionNameMessage = get(config, ['recordTypes', relatedRecordType, 'messages', 'record', 'collectionName']);

    const collectionName = sidebarMessage != null
      ? <FormattedMessage {...sidebarMessage} />
      : <FormattedMessage {...collectionNameMessage} />;

    return <FormattedMessage {...messages.title} values={{ collectionName }} />;
  }

  render() {
    const {
      collapsed,
      color,
      columnSetName,
      config,
      csid,
      listType,
      linkItems,
      name,
      perms,
      recordData,
      recordType,
      relatedRecordType,
      showCheckboxColumn,
      showSearchButton,
      showAddButton,
      getItemLocation,
      onItemClick,
    } = this.props;

    const {
      searchDescriptor,
    } = this.state;

    const relatedServiceType = get(
      config, ['recordTypes', relatedRecordType, 'serviceConfig', 'serviceType'],
    );

    if (
      relatedServiceType === 'object'
      || relatedServiceType === 'procedure'
      || relatedServiceType === 'authority'
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
        listType={listType}
        linkItems={linkItems}
        name={name}
        searchDescriptor={searchDescriptor}
        recordType={recordType}
        recordData={recordData}
        title={this.renderTitle()}
        showAddButton={showAddButton}
        showSearchButton={showSearchButton}
        showCheckboxColumn={showCheckboxColumn}
        renderCheckbox={renderCheckbox}
        renderTableHeader={this.renderTableHeader}
        getItemLocation={getItemLocation}
        onItemClick={onItemClick}
        onSearchDescriptorChange={this.handleSearchDescriptorChange}
      />
    );
  }
}

RelatedRecordPanel.propTypes = propTypes;
RelatedRecordPanel.defaultProps = defaultProps;
