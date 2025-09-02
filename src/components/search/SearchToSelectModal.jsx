import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages, injectIntl, intlShape, FormattedMessage,
} from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { Modal } from 'cspace-layout';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import SearchForm from './SearchForm';
import Pager from './Pager';
import AcceptSelectionButton from './AcceptSelectionButton';
import BackButton from '../navigation/BackButton';
import CancelButton from '../navigation/CancelButton';
import SearchButton from './SearchButton';
import SearchClearButton from './SearchClearButton';
import SearchResultSummary from './SearchResultSummary';
import SearchToSelectTitleBar from './SearchToSelectTitleBar';
import SelectBar from './SelectBar';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import { deriveSearchType, getListTypeFromResult, normalizeCondition } from '../../helpers/searchHelpers';
import styles from '../../../styles/cspace-ui/SearchToSelectModal.css';

export const searchName = 'searchToSelect';

const messages = defineMessages({
  editSearch: {
    id: 'searchToSelectModal.editSearch',
    defaultMessage: 'Revise search',
  },
  label: {
    id: 'searchToSelectModal.label',
    defaultMessage: 'Select records',
  },
});

// FIXME: Make default page size configurable
const defaultPageSize = 20;

const stopPropagation = (event) => {
  event.stopPropagation();
};

const propTypes = {
  acceptButtonClassName: PropTypes.string,
  acceptButtonLabel: PropTypes.node,
  allowedRecordTypes: PropTypes.arrayOf(PropTypes.string),
  allowedServiceTypes: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.shape({
    listTypes: PropTypes.object,
    recordTypes: PropTypes.object,
  }),
  intl: intlShape,
  isOpen: PropTypes.bool,
  keywordValue: PropTypes.string,
  defaultRecordTypeValue: PropTypes.string,
  defaultVocabularyValue: PropTypes.string,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  advancedSearchCondition: PropTypes.instanceOf(Immutable.Map),
  preferredAdvancedSearchBooleanOp: PropTypes.string,
  preferredPageSize: PropTypes.number,
  perms: PropTypes.instanceOf(Immutable.Map),
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  singleSelect: PropTypes.bool,
  titleMessage: PropTypes.objectOf(PropTypes.string),
  getAuthorityVocabCsid: PropTypes.func,
  buildRecordFieldOptionLists: PropTypes.func,
  deleteOptionList: PropTypes.func,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  onAccept: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  onItemSelectChange: PropTypes.func,
  customizeSearchDescriptor: PropTypes.func,
  clearSearchResults: PropTypes.func,
  parentSelector: PropTypes.func,
  renderAcceptPending: PropTypes.func,
  search: PropTypes.func,
  setAllItemsSelected: PropTypes.func,
  setPreferredPageSize: PropTypes.func,
  shouldShowCheckbox: PropTypes.func,
};

const defaultProps = {
  defaultVocabularyValue: 'all',
  selectedItems: Immutable.Map(),
  renderAcceptPending: () => <p />,
  shouldShowCheckbox: () => true,
};

export class BaseSearchToSelectModal extends Component {
  constructor() {
    super();

    this.handleAcceptButtonClick = this.handleAcceptButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleCheckboxCommit = this.handleCheckboxCommit.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleEditSearchLinkClick = this.handleEditSearchLinkClick.bind(this);
    this.handleFormSearch = this.handleFormSearch.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderEditSearchLink = this.renderEditSearchLink.bind(this);
    this.renderModalButtonBar = this.renderModalButtonBar.bind(this);
    this.renderSearchResultTableHeader = this.renderSearchResultTableHeader.bind(this);
    this.renderSearchResultTableFooter = this.renderSearchResultTableFooter.bind(this);

    this.state = {
      isSearchInitiated: false,
      pageNum: 0,
      sort: null,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: nextIsOpen,
    } = nextProps;

    if (isOpen && !nextIsOpen) {
      // Closing.

      this.setState({
        isAcceptHandlerPending: false,
        isSearchInitiated: false,
        pageNum: 0,
        sort: null,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: prevIsOpen,
    } = prevProps;

    if (prevIsOpen && !isOpen) {
      // Closed.

      const {
        clearSearchResults,
        onRecordTypeCommit,
      } = this.props;

      if (clearSearchResults) {
        clearSearchResults(searchName);
      }

      if (onRecordTypeCommit) {
        onRecordTypeCommit('');
      }
    } else if (!prevIsOpen && isOpen) {
      // Opened.

      const {
        config,
        defaultRecordTypeValue,
        defaultVocabularyValue,
        onRecordTypeCommit,
        onVocabularyCommit,
      } = this.props;

      if (onRecordTypeCommit) {
        onRecordTypeCommit(defaultRecordTypeValue);

        if (onVocabularyCommit) {
          const serviceType = get(config, ['recordTypes', defaultRecordTypeValue, 'serviceConfig', 'serviceType']);

          if (serviceType === 'authority') {
            onVocabularyCommit(defaultVocabularyValue);
          }
        }
      }
    }

    const {
      isSearchInitiated,
      pageNum,
      sort,
    } = this.state;

    const {
      config,
      defaultVocabularyValue,
      recordTypeValue,
      vocabularyValue,
      advancedSearchCondition,
      preferredPageSize,
      onVocabularyCommit,
    } = this.props;

    const {
      recordTypeValue: prevRecordTypeValue,
      vocabularyValue: prevVocabularyValue,
      advancedSearchCondition: prevAdvancedSearchCondition,
      preferredPageSize: prevPreferredPageSize,
    } = prevProps;

    if (isSearchInitiated) {
      const {
        pageNum: prevPageNum,
        sort: prevSort,
      } = prevState;

      if (
        recordTypeValue !== prevRecordTypeValue
        || vocabularyValue !== prevVocabularyValue
        || !isEqual(advancedSearchCondition, prevAdvancedSearchCondition)
        || preferredPageSize !== prevPreferredPageSize
        || pageNum !== prevPageNum
        || sort !== prevSort
      ) {
        this.search();
      }
    } else if (recordTypeValue !== prevRecordTypeValue) {
      const serviceType = get(config, ['recordTypes', recordTypeValue, 'serviceConfig', 'serviceType']);

      if (serviceType === 'authority') {
        onVocabularyCommit(defaultVocabularyValue);
      }
    }
  }

  handleAcceptButtonClick() {
    const {
      isSearchInitiated,
    } = this.state;

    if (isSearchInitiated) {
      const {
        onAccept,
        selectedItems,
      } = this.props;

      if (onAccept) {
        this.setState({
          isAcceptHandlerPending: true,
          isSearchInitiated: false,
        });

        Promise.resolve(onAccept(selectedItems, this.getSearchDescriptor()));
      }
    } else {
      this.search();
    }
  }

  handleCancelButtonClick(event) {
    const {
      onCancelButtonClick,
    } = this.props;

    if (onCancelButtonClick) {
      onCancelButtonClick(event);
    }
  }

  handleCloseButtonClick(event) {
    const {
      onCloseButtonClick,
    } = this.props;

    if (onCloseButtonClick) {
      onCloseButtonClick(event);
    }
  }

  handleEditSearchLinkClick() {
    const {
      clearSearchResults,
    } = this.props;

    if (clearSearchResults) {
      clearSearchResults(searchName);
    }

    this.setState({
      isSearchInitiated: false,
    });
  }

  handleFormSearch() {
    this.search();
  }

  handleCheckboxCommit(path, value) {
    const index = parseInt(path[0], 10);

    this.setItemSelected(index, value);
  }

  handleItemClick(item, index) {
    const {
      selectedItems,
      shouldShowCheckbox,
    } = this.props;

    if (shouldShowCheckbox(item)) {
      const itemCsid = item.get('csid');
      const selected = selectedItems ? selectedItems.has(itemCsid) : false;

      this.setItemSelected(index, !selected);
    }
  }

  handlePageChange(pageNum) {
    this.setState({
      pageNum,
    });
  }

  handlePageSizeChange(pageSize) {
    const {
      setPreferredPageSize,
    } = this.props;

    let normalizedPageSize;

    if (Number.isNaN(pageSize) || pageSize < 1) {
      normalizedPageSize = 0;
    } else if (pageSize > 2500) {
      normalizedPageSize = 2500;
    } else {
      normalizedPageSize = pageSize;
    }

    if (setPreferredPageSize) {
      this.setState({
        pageNum: 0,
      });

      setPreferredPageSize(normalizedPageSize);
    }
  }

  handleSortChange(sort) {
    this.setState({
      sort,
    });
  }

  getSearchDescriptor() {
    const {
      config,
      recordTypeValue: recordType,
      vocabularyValue: vocabulary,
      keywordValue: keyword,
      advancedSearchCondition,
      preferredPageSize,
      customizeSearchDescriptor,
    } = this.props;

    const {
      pageNum,
      sort,
    } = this.state;

    const pageSize = preferredPageSize || defaultPageSize;

    const searchQuery = {
      p: pageNum,
      size: pageSize,
    };

    if (sort) {
      searchQuery.sort = sort;
    }

    const kw = keyword ? keyword.trim() : '';

    if (kw) {
      searchQuery.kw = kw;
    }

    const fields = get(config, ['recordTypes', recordType, 'fields']);
    const condition = normalizeCondition(fields, advancedSearchCondition);

    if (condition) {
      searchQuery.as = condition;
    }

    const searchDescriptor = Immutable.fromJS({
      recordType,
      vocabulary,
      searchQuery,
    });

    if (customizeSearchDescriptor) {
      return customizeSearchDescriptor(searchDescriptor);
    }

    return searchDescriptor;
  }

  setItemSelected(index, selected) {
    const {
      config,
      singleSelect,
      setAllItemsSelected,
      onItemSelectChange,
    } = this.props;

    if (onItemSelectChange) {
      const searchDescriptor = this.getSearchDescriptor();
      const { listType } = deriveSearchType(config, searchName, searchDescriptor);

      if (singleSelect && selected) {
        setAllItemsSelected(config, searchName, searchDescriptor, listType, false);
      }

      onItemSelectChange(config, searchName, searchDescriptor, listType, index, selected);
    }
  }

  search() {
    const {
      config,
      search,
    } = this.props;

    if (search) {
      const searchDescriptor = this.getSearchDescriptor();

      search(config, searchName, searchDescriptor);

      this.setState({
        isSearchInitiated: true,
      });
    }
  }

  renderCheckbox({ rowData, rowIndex }) {
    const {
      shouldShowCheckbox,
    } = this.props;

    if (shouldShowCheckbox(rowData)) {
      const {
        selectedItems,
      } = this.props;

      const itemCsid = rowData.get('csid');
      const selected = selectedItems ? selectedItems.has(itemCsid) : false;

      return (
        <CheckboxInput
          embedded
          name={`${rowIndex}`}
          value={selected}
          onCommit={this.handleCheckboxCommit}
          // Prevent click on the checkbox from propagating to the row, which would cause
          // double-toggling of the selected state.
          onClick={stopPropagation}
        />
      );
    }

    return null;
  }

  renderSearchForm() {
    const {
      allowedRecordTypes,
      allowedServiceTypes,
      config,
      intl,
      keywordValue,
      recordTypeValue,
      vocabularyValue,
      perms,
      preferredAdvancedSearchBooleanOp,
      advancedSearchCondition,
      getAuthorityVocabCsid,
      buildRecordFieldOptionLists,
      deleteOptionList,
      onAdvancedSearchConditionCommit,
      onKeywordCommit,
      onRecordTypeCommit,
      onVocabularyCommit,
    } = this.props;

    let recordTypeInputReadOnly = true;
    let recordTypeInputRootType;

    if (allowedServiceTypes) {
      // Allow the record type to be changed.
      recordTypeInputReadOnly = false;

      // Don't show the All Records option.
      recordTypeInputRootType = '';
    } else if (allowedRecordTypes) {
      recordTypeInputReadOnly = (allowedRecordTypes.length < 2);
    }

    return (
      <SearchForm
        config={config}
        intl={intl}
        recordTypeValue={recordTypeValue}
        vocabularyValue={vocabularyValue}
        keywordValue={keywordValue}
        advancedSearchCondition={advancedSearchCondition}
        perms={perms}
        preferredAdvancedSearchBooleanOp={preferredAdvancedSearchBooleanOp}
        recordTypeInputReadOnly={recordTypeInputReadOnly}
        recordTypeInputRootType={recordTypeInputRootType}
        recordTypeInputRecordTypes={allowedRecordTypes}
        recordTypeInputServiceTypes={allowedServiceTypes}
        getAuthorityVocabCsid={getAuthorityVocabCsid}
        buildRecordFieldOptionLists={buildRecordFieldOptionLists}
        deleteOptionList={deleteOptionList}
        onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
        onKeywordCommit={onKeywordCommit}
        onRecordTypeCommit={onRecordTypeCommit}
        onVocabularyCommit={onVocabularyCommit}
        onSearch={this.handleFormSearch}
      />
    );
  }

  renderEditSearchLink() {
    return (
      <button type="button" onClick={this.handleEditSearchLinkClick}>
        <FormattedMessage {...messages.editSearch} />
      </button>
    );
  }

  renderSearchResultTableHeader({ searchError, searchResult }) {
    const {
      config,
      selectedItems,
      setAllItemsSelected,
      shouldShowCheckbox,
      singleSelect,
    } = this.props;

    if (searchError) {
      return null;
    }

    const listType = getListTypeFromResult(config, searchResult);
    const searchDescriptor = this.getSearchDescriptor();

    let selectBar;

    if (!singleSelect) {
      // If only a single selection is allowed, there's no need to show a count of selected records
      // or  a select all checkbox.

      selectBar = (
        <SelectBar
          config={config}
          listType={listType}
          searchDescriptor={searchDescriptor}
          searchName={searchName}
          searchResult={searchResult}
          selectedItems={selectedItems}
          setAllItemsSelected={setAllItemsSelected}
          showCheckboxFilter={shouldShowCheckbox}
        />
      );
    }

    return (
      <header>
        <SearchResultSummary
          config={config}
          listType={listType}
          searchDescriptor={searchDescriptor}
          searchError={searchError}
          searchResult={searchResult}
          renderEditLink={this.renderEditSearchLink}
          onPageSizeChange={this.handlePageSizeChange}
        />
        {selectBar}
      </header>
    );
  }

  renderSearchResultTableFooter({ searchResult }) {
    const {
      config,
    } = this.props;

    if (searchResult) {
      const listType = getListTypeFromResult(config, searchResult);
      const listTypeConfig = config.listTypes[listType];
      const list = searchResult.get(listTypeConfig.listNodeName);

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);

      const lastPage = Math.max(
        0,
        Number.isNaN(totalItems) ? 0 : Math.ceil(totalItems / pageSize) - 1,
      );

      return (
        <footer>
          <Pager
            currentPage={pageNum}
            lastPage={lastPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            onPageSizeChange={this.handlePageSizeChange}
          />
        </footer>
      );
    }

    return null;
  }

  renderSearchResultTable() {
    const {
      config,
      recordTypeValue,
    } = this.props;

    const searchDescriptor = this.getSearchDescriptor();

    return (
      <SearchResultTableContainer
        config={config}
        linkItems={false}
        recordType={recordTypeValue}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
        showCheckboxColumn
        renderCheckbox={this.renderCheckbox}
        renderHeader={this.renderSearchResultTableHeader}
        renderFooter={this.renderSearchResultTableFooter}
        onItemClick={this.handleItemClick}
        onSortChange={this.handleSortChange}
      />
    );
  }

  renderModalButtonBar() {
    const {
      acceptButtonClassName,
      acceptButtonLabel,
      selectedItems,
      onClearButtonClick,
    } = this.props;

    const {
      isAcceptHandlerPending,
      isSearchInitiated,
    } = this.state;

    const cancelButton = (
      <CancelButton
        disabled={isAcceptHandlerPending}
        onClick={this.handleCancelButtonClick}
      />
    );

    let acceptButton;
    let backButton;
    let clearButton;

    if (isSearchInitiated) {
      acceptButton = (
        <AcceptSelectionButton
          className={acceptButtonClassName}
          disabled={isAcceptHandlerPending || !selectedItems || selectedItems.size < 1}
          label={acceptButtonLabel}
          onClick={this.handleAcceptButtonClick}
        />
      );

      backButton = (
        <BackButton
          disabled={isAcceptHandlerPending}
          label={<FormattedMessage {...messages.editSearch} />}
          onClick={this.handleEditSearchLinkClick}
        />
      );
    } else {
      acceptButton = (
        <SearchButton
          disabled={isAcceptHandlerPending}
          type="button"
          onClick={this.handleAcceptButtonClick}
        />
      );

      clearButton = (
        <SearchClearButton onClick={onClearButtonClick} />
      );
    }

    return (
      <div>
        {clearButton}
        {backButton}
        {cancelButton}
        {acceptButton}
      </div>
    );
  }

  render() {
    const {
      config,
      intl,
      isOpen,
      recordTypeValue,
      parentSelector,
      singleSelect,
      titleMessage,
      renderAcceptPending,
    } = this.props;

    const {
      isAcceptHandlerPending,
      isSearchInitiated,
    } = this.state;

    let content;
    let title;

    if (isOpen) {
      if (isAcceptHandlerPending) {
        content = renderAcceptPending();
      } else if (isSearchInitiated) {
        content = this.renderSearchResultTable();
      } else {
        content = this.renderSearchForm();
      }

      const searchDescriptor = this.getSearchDescriptor();

      title = (
        <SearchToSelectTitleBar
          config={config}
          isSearchInitiated={isSearchInitiated}
          recordType={recordTypeValue}
          searchDescriptor={searchDescriptor}
          singleSelect={singleSelect}
          titleMessage={titleMessage}
        />
      );
    }

    return (
      <Modal
        className={styles.common}
        contentLabel={intl.formatMessage(messages.label)}
        title={title}
        isOpen={isOpen}
        showCloseButton={!isAcceptHandlerPending}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        parentSelector={parentSelector}
        renderButtonBar={this.renderModalButtonBar}
        onCloseButtonClick={this.handleCloseButtonClick}
      >
        {content}
      </Modal>
    );
  }
}

BaseSearchToSelectModal.propTypes = propTypes;
BaseSearchToSelectModal.defaultProps = defaultProps;

export default injectIntl(BaseSearchToSelectModal);
