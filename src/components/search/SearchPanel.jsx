import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Immutable from 'immutable';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { baseComponents as inputComponents } from 'cspace-input';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import SearchToRelateModalContainer from '../../containers/search/SearchToRelateModalContainer';
import Pager from './Pager';
import styles from '../../../styles/cspace-ui/SearchPanel.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  search: {
    id: 'searchPanel.search',
    description: 'Label of the search link in the search panel header.',
    defaultMessage: 'Search',
  },
  titleWithCount: {
    id: 'searchPanel.titleWithCount',
    defaultMessage: '{title}: {totalItems, number}',
  },
});

const propTypes = {
  collapsed: PropTypes.bool,
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  name: PropTypes.string,
  recordType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  title: PropTypes.node,
  showAddButton: PropTypes.bool,
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  renderTableHeader: PropTypes.func,
  search: PropTypes.func,
  setPreferredPageSize: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchDescriptorChange: PropTypes.func,
};

const defaultProps = {
  columnSetName: 'default',
  listType: 'common',
};

const contextTypes = {
  router: PropTypes.object,
};

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.renderFooter = this.renderFooter.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalCloseButtonClick = this.handleModalCloseButtonClick.bind(this);
    this.handleRelationsCreated = this.handleRelationsCreated.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.renderButtons = this.renderButtons.bind(this);

    this.state = {
      isSearchToRelateModalOpen: false,
    };
  }

  componentDidMount() {
    this.search();

    const {
      searchDescriptor,
      onSearchDescriptorChange,
    } = this.props;

    if (onSearchDescriptorChange) {
      onSearchDescriptorChange(searchDescriptor);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      searchDescriptor: prevSearchDescriptor,
    } = prevProps;

    const {
      searchDescriptor,
      onSearchDescriptorChange,
    } = this.props;

    if (!isEqual(prevSearchDescriptor, searchDescriptor)) {
      this.search();

      if (onSearchDescriptorChange) {
        onSearchDescriptorChange(searchDescriptor);
      }
    }
  }

  getSearchLocation() {
    const {
      recordType,
      vocabulary,
      csid,
      subresource,
      searchQuery,
    } = this.props.searchDescriptor;

    const pathParts = ['/list', recordType, vocabulary, csid, subresource];
    const pathname = pathParts.filter(part => !!part).join('/');

    const query = Object.assign({}, searchQuery, {
      // Always go to the first page, since the page size may differ on the search result page.
      p: '1',
      // Remove the size, so that the default/preferred setting for the search result page will
      // take effect.
      size: undefined,
    });

    return {
      pathname,
      query,
    };
  }

  closeModal() {
    this.setState({
      isSearchToRelateModalOpen: false,
    });
  }

  handleAddButtonClick() {
    this.setState({
      isSearchToRelateModalOpen: true,
    });
  }

  handleModalCancelButtonClick() {
    this.closeModal();
  }

  handleModalCloseButtonClick() {
    this.closeModal();
  }

  handlePageChange(pageNum) {
    const {
      onSearchDescriptorChange,
      searchDescriptor,
    } = this.props;

    if (onSearchDescriptorChange) {
      onSearchDescriptorChange(merge({}, searchDescriptor, {
        searchQuery: {
          p: pageNum,
        },
      }));
    }
  }

  handlePageSizeChange(pageSize) {
    const {
      name,
      recordType,
      searchDescriptor,
      setPreferredPageSize,
      onSearchDescriptorChange,
    } = this.props;

    if (setPreferredPageSize) {
      setPreferredPageSize(recordType, name, pageSize);
    }

    if (onSearchDescriptorChange) {
      onSearchDescriptorChange(merge({}, searchDescriptor, {
        searchQuery: {
          p: 0,
          size: pageSize,
        },
      }));
    }
  }

  handleRelationsCreated() {
    this.closeModal();
  }

  handleSortChange(sort) {
    const {
      onSearchDescriptorChange,
      searchDescriptor,
    } = this.props;

    if (onSearchDescriptorChange) {
      onSearchDescriptorChange(merge({}, searchDescriptor, {
        searchQuery: {
          sort,
        },
      }));
    }
  }

  search() {
    const {
      columnSetName,
      config,
      listType,
      name,
      search,
      searchDescriptor,
    } = this.props;

    if (search) {
      search(config, name, searchDescriptor, listType, columnSetName);
    }
  }

  renderButtons() {
    const {
      showAddButton,
    } = this.props;

    const buttons = [
      <Link
        to={this.getSearchLocation()}
        key="search"
      >
        <FormattedMessage {...messages.search} />
      </Link>,
    ];

    if (showAddButton) {
      buttons.push(
        <MiniButton
          key="add"
          name="add"
          onClick={this.handleAddButtonClick}
        >
          +
        </MiniButton>
      );
    }

    return buttons;
  }

  renderHeader() {
    const {
      config,
      listType,
      searchResult,
      title,
    } = this.props;

    const listTypeConfig = config.listTypes[listType];

    const totalItems = searchResult
      ? searchResult.getIn([listTypeConfig.listNodeName, 'totalItems'])
      : null;

    const headerContent = (typeof totalItems !== 'undefined' && totalItems !== null)
      ? <FormattedMessage {...messages.titleWithCount} values={{ title, totalItems }} />
      : title;

    return (
      <h3>{headerContent}</h3>
    );
  }

  renderFooter({ searchResult }) {
    const {
      config,
      listType,
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
            pageSizeOptionListName="searchPanelPageSizes"
            windowSize={3}
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
      collapsed,
      color,
      columnSetName,
      config,
      listType,
      name,
      recordType,
      searchDescriptor,
      showAddButton,
      showCheckboxColumn,
      renderCheckbox,
      renderTableHeader,
      onItemClick,
    } = this.props;

    const {
      isSearchToRelateModalOpen,
    } = this.state;

    let searchToRelateModal;

    if (showAddButton) {
      searchToRelateModal = (
        <SearchToRelateModalContainer
          subjectCsid={searchDescriptor.searchQuery.rel}
          subjectRecordType={recordType}
          config={config}
          isOpen={isSearchToRelateModalOpen}
          defaultRecordTypeValue={searchDescriptor.recordType}
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onRelationsCreated={this.handleRelationsCreated}
        />
      );
    }

    return (
      <div>
        <Panel
          buttons={this.renderButtons()}
          className={styles.common}
          collapsible
          collapsed={collapsed}
          color={color}
          config={config}
          header={this.renderHeader()}
          name={name}
          recordType={recordType}
        >
          <SearchResultTableContainer
            columnSetName={columnSetName}
            config={config}
            listType={listType}
            recordType={recordType}
            searchName={name}
            searchDescriptor={searchDescriptor}
            showCheckboxColumn={showCheckboxColumn}
            renderCheckbox={renderCheckbox}
            renderHeader={renderTableHeader}
            renderFooter={this.renderFooter}
            onItemClick={onItemClick}
            onSortChange={this.handleSortChange}
          />
        </Panel>
        {searchToRelateModal}
      </div>
    );
  }
}

SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
SearchPanel.contextTypes = contextTypes;
