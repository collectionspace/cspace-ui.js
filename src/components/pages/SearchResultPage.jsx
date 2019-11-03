/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
import qs from 'qs';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import ErrorPage from './ErrorPage';
import RelateButton from '../record/RelateButton';
import Pager from '../search/Pager';
import SearchResultSidebar from '../search/SearchResultSidebar';
import SearchResultSummary from '../search/SearchResultSummary';
import SearchResultTitleBar from '../search/SearchResultTitleBar';
import SelectBar from '../search/SelectBar';
import WatchedSearchResultTableContainer from '../../containers/search/WatchedSearchResultTableContainer';
import SearchResultSidebarToggleButtonContainer from '../../containers/search/SearchResultSidebarToggleButtonContainer';
import SearchToRelateModalContainer from '../../containers/search/SearchToRelateModalContainer';
import { canRelate } from '../../helpers/permissionHelpers';
import { getListType } from '../../helpers/searchHelpers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';

import {
  getFirstColumnName,
  getRecordTypeNameByServiceObjectName,
  getRecordTypeNameByUri,
  validateLocation,
} from '../../helpers/configHelpers';

import styles from '../../../styles/cspace-ui/SearchResultPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';
import sidebarToggleBarStyles from '../../../styles/cspace-ui/SidebarToggleBar.css';

// FIXME: Make default page size configurable
const defaultPageSize = 20;

// const stopPropagation = (event) => {
//   event.stopPropagation();
// };

const messages = defineMessages({
  relate: {
    id: 'searchResultPage.relate',
    description: 'Label of the relate button on the search result page.',
    defaultMessage: 'Relate…',
  },
});

const propTypes = {
  isSidebarOpen: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredPageSize: PropTypes.number,
  search: PropTypes.func,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  setPreferredPageSize: PropTypes.func,
  setSearchPageAdvanced: PropTypes.func,
  setSearchPageKeyword: PropTypes.func,
  setAllItemsSelected: PropTypes.func,
  onItemSelectChange: PropTypes.func,
};

const defaultProps = {
  isSidebarOpen: true,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class SearchResultPage extends Component {
  constructor() {
    super();

    this.getSearchToRelateSubjects = this.getSearchToRelateSubjects.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleCheckboxCommit = this.handleCheckboxCommit.bind(this);
    this.handleEditSearchLinkClick = this.handleEditSearchLinkClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalCloseButtonClick = this.handleModalCloseButtonClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleRelateButtonClick = this.handleRelateButtonClick.bind(this);
    this.handleRelationsCreated = this.handleRelationsCreated.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      isSearchToRelateModalOpen: false,
    };
  }

  componentDidMount() {
    if (!this.normalizeQuery()) {
      const {
        location,
        setPreferredPageSize,
      } = this.props;

      if (setPreferredPageSize) {
        const {
          search,
        } = location;

        const query = qs.parse(search.substring(1));

        setPreferredPageSize(parseInt(query.size, 10));
      }

      this.search();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      match,
      perms,
    } = this.props;

    const {
      location: prevLocation,
      match: prevMatch,
      perms: prevPerms,
    } = prevProps;

    const { params } = match;
    const { params: prevParams } = prevMatch;

    if (
      perms !== prevPerms ||
      params.recordType !== prevParams.recordType ||
      params.vocabulary !== prevParams.vocabulary ||
      params.csid !== prevParams.csid ||
      params.subresource !== prevParams.subresource ||
      location.search !== prevLocation.search
    ) {
      if (!this.normalizeQuery()) {
        const {
          setPreferredPageSize,
        } = this.props;

        if (setPreferredPageSize) {
          const {
            search,
          } = location;

          const query = qs.parse(search.substring(1));

          setPreferredPageSize(parseInt(query.size, 10));
        }

        this.search();
      }
    }
  }

  getListType(searchDescriptor) {
    const {
      config,
    } = this.context;

    return getListType(config, searchDescriptor);
  }

  getSearchDescriptor() {
    // FIXME: Refactor this into a wrapper component that calculates the search descriptor from
    // location and params, and passes it into a child. This will eliminate the multiple calls to
    // this method from the various render methods in this class.

    const {
      location,
      match,
    } = this.props;

    const {
      params,
    } = match;

    const {
      search,
    } = location;

    const query = qs.parse(search.substring(1));

    const searchQuery = Object.assign({}, query, {
      p: parseInt(query.p, 10) - 1,
      size: parseInt(query.size, 10),
    });

    const advancedSearchCondition = query.as;

    if (advancedSearchCondition) {
      searchQuery.as = JSON.parse(advancedSearchCondition);
    }

    const searchDescriptor = {
      searchQuery,
    };

    ['recordType', 'vocabulary', 'csid', 'subresource'].forEach((param) => {
      const value = params[param];

      if (typeof value !== 'undefined') {
        searchDescriptor[param] = value;
      }
    });

    return Immutable.fromJS(searchDescriptor);
  }

  getSearchToRelateSubjects() {
    const {
      selectedItems,
    } = this.props;

    const {
      config,
    } = this.context;

    if (!selectedItems) {
      return null;
    }

    const searchDescriptor = this.getSearchDescriptor();

    const recordType = searchDescriptor.get('recordType');
    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);
    const itemRecordType = (serviceType === 'utility') ? undefined : recordType;

    const titleColumnName = getFirstColumnName(config, recordType);

    return selectedItems.valueSeq().map(item => ({
      csid: item.get('csid'),
      recordType: itemRecordType || getRecordTypeNameByServiceObjectName(config, item.get('docType')),
      title: item.get(titleColumnName),
    })).toJS();
  }

  isResultRelatable(searchDescriptor) {
    const {
      config,
    } = this.context;

    const recordType = searchDescriptor.get('recordType');
    const subresource = searchDescriptor.get('subresource');

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    return (
      subresource !== 'terms' && (
        serviceType === 'procedure' ||
        serviceType === 'object' ||
        recordType === 'procedure' ||
        recordType === 'object'
      )
    );
  }

  closeModal() {
    this.setState({
      isSearchToRelateModalOpen: false,
      selectionValidationError: undefined,
    });
  }

  normalizeQuery() {
    const {
      history,
      location,
      preferredPageSize,
    } = this.props;

    const {
      search,
    } = location;

    const query = qs.parse(search.substring(1));

    if (history) {
      const normalizedQueryParams = {};

      const pageSize = parseInt(query.size, 10);

      if (isNaN(pageSize) || pageSize < 1) {
        const normalizedPageSize = preferredPageSize || defaultPageSize;

        normalizedQueryParams.size = normalizedPageSize.toString();
      } else if (pageSize > 2500) {
        // Services layer max is 2500
        normalizedQueryParams.size = '2500';
      } else if (pageSize.toString() !== query.size) {
        normalizedQueryParams.size = pageSize.toString();
      }

      const pageNum = parseInt(query.p, 10);

      if (isNaN(pageNum) || pageNum < 1) {
        normalizedQueryParams.p = '1';
      } else if (pageNum.toString() !== query.p) {
        normalizedQueryParams.p = pageNum.toString();
      }

      if (Object.keys(normalizedQueryParams).length > 0) {
        const newQuery = Object.assign({}, query, normalizedQueryParams);
        const queryString = qs.stringify(newQuery);

        history.replace({
          pathname: location.pathname,
          search: `?${queryString}`,
        });

        return true;
      }
    }

    return false;
  }

  validateSelectedItemsRelatable() {
    const {
      perms,
      selectedItems,
    } = this.props;

    const {
      config,
    } = this.context;

    if (selectedItems) {
      let err;

      selectedItems.valueSeq().find((item) => {
        if (item.get('workflowState') === 'locked') {
          err = {
            code: 'locked',
          };

          return true;
        }

        const recordType = getRecordTypeNameByUri(config, item.get('uri'));

        if (!canRelate(recordType, perms, config)) {
          const recordMessages = get(config, ['recordTypes', recordType, 'messages', 'record']);

          err = {
            code: 'notPermitted',
            values: {
              name: <FormattedMessage {...recordMessages.name} />,
              collectionName: <FormattedMessage {...recordMessages.collectionName} />,
            },
          };

          return true;
        }

        return false;
      });

      if (err) {
        return err;
      }
    }

    return undefined;
  }

  handleCheckboxClick(event) {
    // DRYD-252: Elaborate workaround for Firefox. When a checkbox is a child of an a, clicking on
    // the checkbox navigates to the link. So we have to handle the checkbox click, and prevent the
    // default. This prevents the navigation, but also prevents the checkbox state from changing.
    // So we also have to manually commit the change. The Firefox bug has been open for 17 years
    // now. https://bugzilla.mozilla.org/show_bug.cgi?id=62151

    event.preventDefault();
    event.stopPropagation();

    const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    const index = checkbox.dataset.name;

    window.setTimeout(() => {
      this.handleCheckboxCommit([index], !checkbox.checked);
    }, 0);
  }

  handleCheckboxCommit(path, value) {
    const index = parseInt(path[0], 10);
    const selected = value;

    const {
      onItemSelectChange,
    } = this.props;

    const {
      config,
    } = this.context;

    if (onItemSelectChange) {
      const searchDescriptor = this.getSearchDescriptor();
      const listType = this.getListType(searchDescriptor);

      onItemSelectChange(
        config, SEARCH_RESULT_PAGE_SEARCH_NAME, searchDescriptor, listType, index, selected);
    }
  }

  handleEditSearchLinkClick() {
    // Transfer this search descriptor's search criteria to advanced search.

    const {
      setSearchPageAdvanced,
      setSearchPageKeyword,
    } = this.props;

    if (setSearchPageKeyword || setSearchPageAdvanced) {
      const searchDescriptor = this.getSearchDescriptor();
      const searchQuery = searchDescriptor.get('searchQuery');

      if (setSearchPageKeyword) {
        setSearchPageKeyword(searchQuery.get('kw'));
      }

      if (setSearchPageAdvanced) {
        setSearchPageAdvanced(searchQuery.get('as'));
      }
    }
  }

  handleModalCancelButtonClick() {
    this.closeModal();
  }

  handleModalCloseButtonClick() {
    this.closeModal();
  }

  handlePageChange(pageNum) {
    const {
      history,
      location,
    } = this.props;

    if (history) {
      const {
        search,
      } = location;

      const query = qs.parse(search.substring(1));

      query.p = (pageNum + 1).toString();

      const queryString = qs.stringify(query);

      history.push({
        pathname: location.pathname,
        search: `?${queryString}`,
      });
    }
  }

  handlePageSizeChange(pageSize) {
    const {
      history,
      location,
      setPreferredPageSize,
    } = this.props;

    if (setPreferredPageSize) {
      setPreferredPageSize(pageSize);
    }

    if (history) {
      const {
        search,
      } = location;

      const query = qs.parse(search.substring(1));

      query.p = '1';
      query.size = pageSize.toString();

      const queryString = qs.stringify(query);

      history.push({
        pathname: location.pathname,
        search: `?${queryString}`,
      });
    }
  }

  handleRelateButtonClick() {
    this.setState({
      isSearchToRelateModalOpen: true,
      selectionValidationError: this.validateSelectedItemsRelatable(),
    });
  }

  handleRelationsCreated() {
    this.closeModal();
  }

  handleSortChange(sort) {
    const {
      history,
      location,
    } = this.props;

    if (history) {
      const {
        search,
      } = location;

      const query = qs.parse(search.substring(1));

      query.sort = sort;

      const queryString = qs.stringify(query);

      history.push({
        pathname: location.pathname,
        search: `?${queryString}`,
      });
    }
  }

  search() {
    const {
      search,
    } = this.props;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();
    const searchQuery = searchDescriptor.get('searchQuery');

    // Don't send the query if the provided page size and/or number are invalid.
    // The search will be repeated with a valid descriptor once normalizeQuery
    // has set them to the defaults.

    if (!isNaN(searchQuery.get('p')) && !isNaN(searchQuery.get('size')) && search) {
      const listType = this.getListType(searchDescriptor);

      search(config, SEARCH_RESULT_PAGE_SEARCH_NAME, searchDescriptor, listType);
    }
  }

  renderCheckbox({ rowData, rowIndex }) {
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

        // DRYD-252: Elaborate workaround for Firefox, part II. Use this onClick instead of the
        // onCommit and onClick below.
        onClick={this.handleCheckboxClick}
        // onCommit={this.handleCheckboxCommit}
        // Prevent clicking on the checkbox from selecting the record.
        // onClick={stopPropagation}
      />
    );
  }

  renderHeader({ searchError, searchResult }) {
    const {
      selectedItems,
      setAllItemsSelected,
    } = this.props;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();
    const listType = this.getListType(searchDescriptor);

    let selectBar;

    if (!searchError) {
      const selectedCount = selectedItems ? selectedItems.size : 0;

      let relateButton;

      if (this.isResultRelatable(searchDescriptor)) {
        relateButton = (
          <RelateButton
            disabled={selectedCount < 1}
            key="relate"
            label={<FormattedMessage {...messages.relate} />}
            name="relate"
            onClick={this.handleRelateButtonClick}
          />
        );
      }

      selectBar = (
        <SelectBar
          buttons={[relateButton]}
          config={config}
          listType={listType}
          searchDescriptor={searchDescriptor}
          searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
          searchResult={searchResult}
          selectedItems={selectedItems}
          setAllItemsSelected={setAllItemsSelected}
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
          onEditSearchLinkClick={this.handleEditSearchLinkClick}
          onPageSizeChange={this.handlePageSizeChange}
        />
        {selectBar}
      </header>
    );
  }

  renderFooter({ searchResult }) {
    if (searchResult) {
      const {
        config,
      } = this.context;

      const searchDescriptor = this.getSearchDescriptor();
      const listType = this.getListType(searchDescriptor);
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName } = listTypeConfig;

      const list = searchResult.get(listNodeName);

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);
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

  render() {
    const {
      history,
      isSidebarOpen,
      selectedItems,
    } = this.props;

    const {
      config,
    } = this.context;

    const {
      isSearchToRelateModalOpen,
      selectionValidationError,
    } = this.state;

    const searchDescriptor = this.getSearchDescriptor();
    const advancedSearchCondition = searchDescriptor.getIn(['searchQuery', 'as']);

    const listType = this.getListType(searchDescriptor);

    const recordType = searchDescriptor.get('recordType');
    const vocabulary = searchDescriptor.get('vocabulary');
    const csid = searchDescriptor.get('csid');
    const subresource = searchDescriptor.get('subresource');

    const validation = validateLocation(config, { recordType, vocabulary, csid, subresource });

    if (validation.error) {
      return (
        <ErrorPage error={validation.error} />
      );
    }

    const isResultRelatable = this.isResultRelatable(searchDescriptor);

    let searchToRelateModal;

    if (isResultRelatable) {
      searchToRelateModal = (
        <SearchToRelateModalContainer
          allowedServiceTypes={['object', 'procedure']}
          subjects={this.getSearchToRelateSubjects}
          config={config}
          isOpen={isSearchToRelateModalOpen}
          defaultRecordTypeValue="collectionobject"
          error={selectionValidationError}
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onRelationsCreated={this.handleRelationsCreated}
        />
      );
    }

    return (
      <div className={styles.common}>
        <SearchResultTitleBar
          config={config}
          searchDescriptor={searchDescriptor}
          searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
          updateDocumentTitle
        />

        <div
          className={
            advancedSearchCondition
              ? sidebarToggleBarStyles.advanced
              : sidebarToggleBarStyles.normal
          }
        >
          <SearchResultSidebarToggleButtonContainer />
        </div>

        <div className={isSidebarOpen ? pageBodyStyles.common : pageBodyStyles.full}>
          <WatchedSearchResultTableContainer
            config={config}
            history={history}
            listType={listType}
            searchName={SEARCH_RESULT_PAGE_SEARCH_NAME}
            searchDescriptor={searchDescriptor}
            recordType={recordType}
            showCheckboxColumn
            renderCheckbox={this.renderCheckbox}
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
            onSortChange={this.handleSortChange}
            search={this.search}
          />

          <SearchResultSidebar
            config={config}
            history={history}
            isOpen={isSidebarOpen}
            recordType={recordType}
            selectedItems={selectedItems}
          />
        </div>

        {searchToRelateModal}
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.defaultProps = defaultProps;
SearchResultPage.contextTypes = contextTypes;
