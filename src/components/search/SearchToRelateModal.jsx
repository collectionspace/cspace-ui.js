import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { Modal } from 'cspace-layout';
import SearchForm from './SearchForm';
import PageSizeChooser from './PageSizeChooser';
import Pager from './Pager';
import SearchToRelateTitleBar from './SearchToRelateTitleBar';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import { normalizeCondition } from '../../helpers/searchHelpers';
import styles from '../../../styles/cspace-ui/SearchToRelateModal.css';
import searchResultTableHeaderStyles from '../../../styles/cspace-ui/SearchResultTableHeader.css';

const messages = defineMessages({
  label: {
    id: 'searchToRelateModal.label',
    defaultMessage: 'Search to Relate',
  },
  cancel: {
    id: 'searchToRelateModal.cancel',
    defaultMessage: 'Cancel',
  },
  relate: {
    id: 'searchToRelateModal.relate',
    defaultMessage: 'Relate selected',
  },
  search: {
    id: 'searchToRelateModal.search',
    defaultMessage: 'Search',
  },
  error: {
    id: 'searchToRelateModal.error',
    defaultMessage: 'Error: {message}',
  },
  editSearch: {
    id: 'searchToRelateModal.editSearch',
    defaultMessage: 'Revise search',
  },
  relating: {
    id: 'searchToRelateModal.relating',
    defaultMessage: 'Relating...',
  },
});

export const searchName = 'searchToRelate';

const listType = 'common';
// FIXME: Make default page size configurable
const defaultPageSize = 20;

const handleItemClick = () => false;

const propTypes = {
  config: PropTypes.object,
  intl: intlShape,
  isOpen: PropTypes.bool,
  keywordValue: PropTypes.string,
  defaultRecordTypeValue: PropTypes.string,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  advancedSearchCondition: PropTypes.object,
  preferredPageSize: PropTypes.number,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  subjectCsid: PropTypes.string,
  subjectRecordType: PropTypes.string,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onItemSelectChange: PropTypes.func,
  onRelationsCreated: PropTypes.func,
  clearSearchResults: PropTypes.func,
  createRelations: PropTypes.func,
  parentSelector: PropTypes.func,
  search: PropTypes.func,
  setPreferredPageSize: PropTypes.func,
};

class SearchToRelateModal extends Component {
  constructor() {
    super();

    this.handleAcceptButtonClick = this.handleAcceptButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleEditSearchLinkClick = this.handleEditSearchLinkClick.bind(this);
    this.handleFormSearch = this.handleFormSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderSearchResultTableHeader = this.renderSearchResultTableHeader.bind(this);
    this.renderSearchResultTableFooter = this.renderSearchResultTableFooter.bind(this);

    this.state = {
      isSearchInitiated: false,
      pageNum: 0,
      sort: null,
    };
  }

  componentDidMount() {
    const {
      defaultRecordTypeValue,
      onRecordTypeCommit,
    } = this.props;

    if (onRecordTypeCommit) {
      onRecordTypeCommit(defaultRecordTypeValue);

      // TODO: If search to relate is ever used on authorities, need to set the default vocabulary
      // if this is an authority record type, and vocabularyValue is not provided.
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: nextIsOpen,
    } = nextProps;

    if (isOpen && !nextIsOpen) {
      // Closing.

      const {
        clearSearchResults,
      } = this.props;

      if (clearSearchResults) {
        clearSearchResults(searchName);
      }

      this.setState({
        isRelating: false,
        isSearchInitiated: false,
        pageNum: 0,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      defaultRecordTypeValue,
      onRecordTypeCommit,
    } = this.props;

    const {
      defaultRecordTypeValue: prevDefaultRecordTypeValue,
    } = prevProps;

    if (onRecordTypeCommit && defaultRecordTypeValue !== prevDefaultRecordTypeValue) {
      onRecordTypeCommit(defaultRecordTypeValue);

      // TODO: If search to relate is ever used on authorities, need to set the default vocabulary
      // if this is an authority record type, and vocabularyValue is not provided.
    }

    const {
      isSearchInitiated,
      pageNum,
      sort,
    } = this.state;

    if (isSearchInitiated) {
      const {
        recordTypeValue,
        vocabularyValue,
        advancedSearchCondition,
        preferredPageSize,
      } = this.props;

      const {
        recordTypeValue: prevRecordTypeValue,
        vocabularyValue: prevVocabularyValue,
        advancedSearchCondition: prevAdvancedSearchCondition,
        preferredPageSize: prevPreferredPageSize,
      } = prevProps;

      const {
        pageNum: prevPageNum,
        sort: prevSort,
      } = prevState;

      if (
        recordTypeValue !== prevRecordTypeValue ||
        vocabularyValue !== prevVocabularyValue ||
        !isEqual(advancedSearchCondition, prevAdvancedSearchCondition) ||
        preferredPageSize !== prevPreferredPageSize ||
        pageNum !== prevPageNum ||
        sort !== prevSort
      ) {
        this.search();
      }
    }
  }

  getSearchDescriptor() {
    const {
      config,
      recordTypeValue: recordType,
      vocabularyValue: vocabulary,
      keywordValue: keyword,
      advancedSearchCondition,
      preferredPageSize,
      subjectCsid,
    } = this.props;

    const {
      pageNum,
      sort,
    } = this.state;

    const pageSize = preferredPageSize || defaultPageSize;

    const searchQuery = {
      mkRtSbj: subjectCsid,
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

    return {
      recordType,
      vocabulary,
      searchQuery,
    };
  }

  relate() {
    const {
      selectedItems,
      subjectCsid,
      subjectRecordType,
      createRelations,
      onRelationsCreated,
    } = this.props;

    const searchDescriptor = this.getSearchDescriptor();

    this.setState({
      isRelating: true,
      isSearchInitiated: false,
    });

    const subject = {
      csid: subjectCsid,
      type: subjectRecordType,
    };

    const objects = selectedItems.valueSeq().map(item => ({
      csid: item.get('csid'),
      type: searchDescriptor.recordType, // TODO: Check the item's docType first
    })).toJS();

    createRelations(subject, objects, 'affects')
      .then(() => {
        if (onRelationsCreated) {
          onRelationsCreated();
        }
      });
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

  handleAcceptButtonClick() {
    const {
      isSearchInitiated,
    } = this.state;

    if (isSearchInitiated) {
      this.relate();
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

  handleCheckboxChange(event) {
    const checkbox = event.target;
    const index = parseInt(checkbox.name, 10);
    const checked = checkbox.checked;

    const {
      config,
      onItemSelectChange,
    } = this.props;

    if (onItemSelectChange) {
      const searchDescriptor = this.getSearchDescriptor();

      onItemSelectChange(config, searchName, searchDescriptor, listType, index, checked);
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

    if (isNaN(pageSize) || pageSize < 1) {
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

  renderCheckbox({ rowData, rowIndex }) {
    const {
      subjectCsid,
      selectedItems,
    } = this.props;

    if (rowData.get('related') === 'true') {
      return null;
    }

    const itemCsid = rowData.get('csid');

    if (itemCsid === subjectCsid) {
      return null;
    }

    const selected = selectedItems ? selectedItems.has(itemCsid) : false;

    return (
      <input
        checked={selected}
        name={rowIndex}
        type="checkbox"
        onChange={this.handleCheckboxChange}
      />
    );
  }

  renderSearchForm() {
    const {
      config,
      intl,
      keywordValue,
      recordTypeValue,
      vocabularyValue,
      advancedSearchCondition,
      onAdvancedSearchConditionCommit,
      onKeywordCommit,
      onRecordTypeCommit,
      onVocabularyCommit,
    } = this.props;

    return (
      <SearchForm
        config={config}
        intl={intl}
        recordTypeValue={recordTypeValue}
        vocabularyValue={vocabularyValue}
        keywordValue={keywordValue}
        advancedSearchCondition={advancedSearchCondition}
        recordTypeInputReadOnly
        onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
        onKeywordCommit={onKeywordCommit}
        onRecordTypeCommit={onRecordTypeCommit}
        onVocabularyCommit={onVocabularyCommit}
        onSearch={this.handleFormSearch}
      />
    );
  }

  renderEditLink() {
    return (
      <button onClick={this.handleEditSearchLinkClick}>
        <FormattedMessage {...messages.editSearch} />
      </button>
    );
  }

  renderSearchResultTableHeader({ searchError, searchResult }) {
    if (searchError) {
      // FIXME: Make a proper error page
      const message = searchError.get('code') || '';

      return (
        <header className={searchResultTableHeaderStyles.error}>
          <FormattedMessage {...messages.error} values={{ message }} />
          <p>{this.renderEditLink()}</p>
        </header>
      );
    }

    let message = null;
    let pageSize = null;

    if (searchResult) {
      const {
        config,
      } = this.props;

      const listTypeConfig = config.listTypes[listType];
      const { listNodeName } = listTypeConfig;

      const list = searchResult.get(listNodeName);
      const totalItems = parseInt(list.get('totalItems'), 10);

      if (isNaN(totalItems)) {
        message = (
          <FormattedMessage {...listTypeConfig.messages.searching} />
        );
      } else {
        const pageNum = parseInt(list.get('pageNum'), 10);

        pageSize = parseInt(list.get('pageSize'), 10);

        const startNum = (pageNum * pageSize) + 1;
        const endNum = Math.min((pageNum * pageSize) + pageSize, totalItems);

        message = (
          <FormattedMessage
            {...listTypeConfig.messages.resultCount}
            values={{
              totalItems,
              startNum,
              endNum,
            }}
          />
        );
      }
    }

    if (pageSize === null) {
      const searchDescriptor = this.getSearchDescriptor();

      pageSize = searchDescriptor.searchQuery.size;
    }

    const content = (
      <div>
        {message}
        {message ? ' | ' : ''}
        {this.renderEditLink()}
      </div>
    );

    const pageSizeChooser = (
      <PageSizeChooser
        pageSize={pageSize}
        onPageSizeChange={this.handlePageSizeChange}
      />
    );

    return (
      <header className={searchResultTableHeaderStyles.normal}>
        {content}
        {pageSizeChooser}
      </header>
    );
  }

  renderSearchResultTableFooter({ searchResult }) {
    const {
      config,
    } = this.props;

    if (searchResult) {
      const listTypeConfig = config.listTypes[listType];
      const list = searchResult.get(listTypeConfig.listNodeName);

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);
      const lastPage = Math.max(0, isNaN(totalItems) ? 0 : Math.ceil(totalItems / pageSize) - 1);

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
        listType={listType}
        recordType={recordTypeValue}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
        showCheckboxColumn
        renderCheckbox={this.renderCheckbox}
        renderHeader={this.renderSearchResultTableHeader}
        renderFooter={this.renderSearchResultTableFooter}
        onItemClick={handleItemClick}
        onSortChange={this.handleSortChange}
      />
    );
  }

  render() {
    const {
      config,
      intl,
      isOpen,
      recordTypeValue,
      selectedItems,
      parentSelector,
    } = this.props;

    const {
      isRelating,
      isSearchInitiated,
    } = this.state;

    let content;

    if (isRelating) {
      content = <p><FormattedMessage {...messages.relating} /></p>;
    } else if (isSearchInitiated) {
      content = this.renderSearchResultTable();
    } else {
      content = this.renderSearchForm();
    }

    const acceptButtonMessage = isSearchInitiated
      ? messages.relate
      : messages.search;

    const acceptButtonDisabled = (
      isRelating ||
      (isSearchInitiated && (!selectedItems || selectedItems.size < 1))
    );

    const cancelButtonDisabled = isRelating;

    const searchDescriptor = this.getSearchDescriptor();

    const title = (
      <SearchToRelateTitleBar
        config={config}
        isSearchInitiated={isSearchInitiated}
        recordType={recordTypeValue}
        searchDescriptor={searchDescriptor}
      />
    );

    return (
      <Modal
        className={styles.common}
        contentLabel={intl.formatMessage(messages.label)}
        title={title}
        isOpen={isOpen}
        showCloseButton={!isRelating}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        cancelButtonLabel={intl.formatMessage(messages.cancel)}
        cancelButtonDisabled={cancelButtonDisabled}
        acceptButtonLabel={intl.formatMessage(acceptButtonMessage)}
        acceptButtonDisabled={acceptButtonDisabled}
        parentSelector={parentSelector}
        onAcceptButtonClick={this.handleAcceptButtonClick}
        onCancelButtonClick={this.handleCancelButtonClick}
        onCloseButtonClick={this.handleCloseButtonClick}
      >
        {content}
      </Modal>
    );
  }
}

SearchToRelateModal.propTypes = propTypes;

export default injectIntl(SearchToRelateModal);
