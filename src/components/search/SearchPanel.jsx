import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import get from 'lodash/get';
import { baseComponents as inputComponents } from 'cspace-input';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import SearchToRelateModalContainer from '../../containers/search/SearchToRelateModalContainer';
import { searchDescriptorToLocation } from '../../helpers/searchHelpers';
import Pager from './Pager';
import styles from '../../../styles/cspace-ui/SearchPanel.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  search: {
    id: 'searchPanel.openSearch',
    description: 'Label of the open as search link in the search panel header.',
    defaultMessage: 'Open',
  },
  titleWithCount: {
    id: 'searchPanel.titleWithCount',
    defaultMessage: '{title}: {totalItems, number}',
  },
  titleWithCountFiltered: {
    id: 'searchPanel.titleWithCountFiltered',
    defaultMessage: '{title}: {totalItems, number} (filtered)',
  },
});

const propTypes = {
  collapsed: PropTypes.bool,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  columnSetName: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  isFiltered: PropTypes.bool,
  linkItems: PropTypes.bool,
  name: PropTypes.string,
  pageSizeOptionListName: PropTypes.string,
  recordType: PropTypes.string,
  recordData: PropTypes.instanceOf(Immutable.Map),
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  listType: PropTypes.string,
  title: PropTypes.node,
  showAddButton: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  renderTableHeader: PropTypes.func,
  search: PropTypes.func,
  setPreferredPageSize: PropTypes.func,
  getItemLocation: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchDescriptorChange: PropTypes.func,
};

const defaultProps = {
  collapsible: true,
  columnSetName: 'default',
  listType: 'common',
  pageSizeOptionListName: 'searchPanelPageSizes',
  showSearchButton: true,
};

const contextTypes = {
  intl: intlShape,
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
      searchResult: prevSearchResult,
    } = prevProps;

    const {
      searchDescriptor,
      searchError,
      searchResult,
      onSearchDescriptorChange,
    } = this.props;

    if (
      !Immutable.is(prevSearchDescriptor, searchDescriptor)
      // If the search result was cleared from the store (not due to the search failing), redo the
      // search.
      || (typeof searchResult === 'undefined' && prevSearchResult && !searchError)
    ) {
      this.search();

      if (onSearchDescriptorChange) {
        onSearchDescriptorChange(searchDescriptor);
      }
    }
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
      const searchQuery = searchDescriptor.get('searchQuery');

      onSearchDescriptorChange(
        searchDescriptor.set('searchQuery', searchQuery.set('p', pageNum)),
      );
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
      const searchQuery = searchDescriptor.get('searchQuery');

      onSearchDescriptorChange(
        searchDescriptor.set('searchQuery', searchQuery.set('p', 0).set('size', pageSize)),
      );
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
      const searchQuery = searchDescriptor.get('searchQuery');

      onSearchDescriptorChange(
        searchDescriptor.set('searchQuery', searchQuery.set('sort', sort)),
      );
    }
  }

  getSearchLocation() {
    const {
      searchDescriptor,
    } = this.props;

    const searchQuery = searchDescriptor.get('searchQuery');

    // Always go to the first page, since the page size may differ on the search result page.
    // Remove the size, so that the default/preferred setting for the search result page will
    // take effect.

    return searchDescriptorToLocation(
      searchDescriptor.set('searchQuery', searchQuery.set('p', 0).delete('size')),
    );
  }

  closeModal() {
    this.setState({
      isSearchToRelateModalOpen: false,
    });
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
      showSearchButton,
    } = this.props;

    const buttons = [];

    if (showSearchButton) {
      buttons.push(
        <Link
          to={this.getSearchLocation()}
          key="search"
        >
          <FormattedMessage {...messages.search} />
        </Link>,
      );
    }

    if (showAddButton) {
      buttons.push(
        <MiniButton
          autoWidth
          key="add"
          name="add"
          onClick={this.handleAddButtonClick}
        >
          Add…
        </MiniButton>,
      );
    }

    return buttons;
  }

  renderHeader() {
    const {
      config,
      isFiltered,
      listType,
      searchResult,
      title,
    } = this.props;

    const listTypeConfig = config.listTypes[listType];

    const totalItems = searchResult
      ? searchResult.getIn([listTypeConfig.listNodeName, 'totalItems'])
      : null;

    let headerContent;

    if (typeof totalItems !== 'undefined' && totalItems !== null) {
      const messageKey = isFiltered ? 'titleWithCountFiltered' : 'titleWithCount';

      headerContent = (
        <FormattedMessage
          {...messages[messageKey]}
          values={{
            title,
            totalItems,
          }}
        />
      );
    } else {
      headerContent = title;
    }

    return (
      <h3>{headerContent}</h3>
    );
  }

  renderFooter({ searchResult }) {
    const {
      config,
      listType,
      pageSizeOptionListName,
    } = this.props;

    if (searchResult) {
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
            pageSizeOptionListName={pageSizeOptionListName}
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
      collapsible,
      color,
      columnSetName,
      config,
      linkItems,
      listType,
      name,
      recordType,
      recordData,
      searchDescriptor,
      showAddButton,
      showCheckboxColumn,
      renderCheckbox,
      renderTableHeader,
      getItemLocation,
      onItemClick,
    } = this.props;

    const {
      intl,
    } = this.context;

    const {
      isSearchToRelateModalOpen,
    } = this.state;

    let searchToRelateModal;

    if (showAddButton) {
      const defaultRecordTypeValue = searchDescriptor.get('recordType');

      const defaultServiceType = get(config, ['recordTypes', defaultRecordTypeValue, 'serviceConfig', 'serviceType']);

      let allowedServiceTypes;

      if (defaultServiceType === 'utility') {
        allowedServiceTypes = [defaultRecordTypeValue];
      }

      const titleGetter = get(config, ['recordTypes', recordType, 'title']);
      const title = titleGetter && titleGetter(recordData, { config, intl });

      searchToRelateModal = (
        <SearchToRelateModalContainer
          allowedServiceTypes={allowedServiceTypes}
          subjects={[
            {
              recordType,
              title,
              csid: searchDescriptor.getIn(['searchQuery', 'rel']),
            },
          ]}
          config={config}
          isOpen={isSearchToRelateModalOpen}
          defaultRecordTypeValue={defaultRecordTypeValue}
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
          collapsible={collapsible}
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
            linkItems={linkItems}
            listType={listType}
            recordType={recordType}
            searchName={name}
            searchDescriptor={searchDescriptor}
            showCheckboxColumn={showCheckboxColumn}
            renderCheckbox={renderCheckbox}
            renderHeader={renderTableHeader}
            renderFooter={this.renderFooter}
            getItemLocation={getItemLocation}
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
