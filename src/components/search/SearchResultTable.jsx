import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Table } from 'cspace-layout';
import styles from '../../../styles/cspace-ui/SearchResultTable.css';
import emptyResultStyles from '../../../styles/cspace-ui/SearchResultEmpty.css';

const rowHeight = 22;

const messages = defineMessages({
  searchPending: {
    id: 'searchResultTable.searchPending',
    defaultMessage: '⋯',
  },
});

/**
 * Determines if a column is sortable for a given search. A column is sortable if isSortable is
 * true, and the search is not contrained by a related record, or if it is, the field to sort by is
 * not complex. This is here to deal with CSPACE-5366 (searches with related record constraints are
 * done using CMIS, which can't see into complex fields). If that bug is ever fixed, then it will
 * suffice just to check isSortable.
 */
const isSortable = (column, searchDescriptor) => {
  const { sortBy } = column;

  return (sortBy && (!searchDescriptor.searchQuery.rel || sortBy.indexOf('/0/') === -1));
};

const propTypes = {
  columnSetName: PropTypes.string,
  config: PropTypes.object.isRequired,
  formatCellData: PropTypes.func,
  formatColumnLabel: PropTypes.func,
  isSearchPending: PropTypes.bool,
  listType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  onItemCheckboxChange: PropTypes.func,
  onItemClick: PropTypes.func,
  onSortChange: PropTypes.func,
};

const defaultProps = {
  columnSetName: 'default',
  formatCellData: (column, data) => data,
  formatColumnLabel: column => column.messages.label.defaultMessage,
  listType: 'common',
  renderHeader: () => null,
  renderFooter: () => null,
};

const contextTypes = {
  router: PropTypes.object,
};

export default class SearchResultTable extends Component {
  constructor() {
    super();

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.renderNoItems = this.renderNoItems.bind(this);
    this.sort = this.sort.bind(this);
  }

  handleCheckboxChange(index, checked) {
    const {
      config,
      listType,
      searchResult,
      onItemCheckboxChange,
    } = this.props;

    if (searchResult && onItemCheckboxChange) {
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      const items = searchResult.getIn([listNodeName, itemNodeName]);
      const item = Immutable.List.isList(items) ? items.get(index) : items;

      onItemCheckboxChange(index, item, checked);
    }
  }

  handleRowClick(index) {
    const {
      config,
      listType,
      searchDescriptor,
      searchResult,
      onItemClick,
    } = this.props;

    const {
      router,
    } = this.context;

    if (searchResult && (router || onItemClick)) {
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      const items = searchResult.getIn([listNodeName, itemNodeName]);
      const item = Immutable.List.isList(items) ? items.get(index) : items;

      let performDefault = true;

      if (onItemClick) {
        performDefault = onItemClick(item);
      }

      if (performDefault) {
        const itemContext = { config, searchDescriptor };
        const itemLocation = listTypeConfig.getItemLocation(item, itemContext);

        if (itemLocation) {
          router.push(itemLocation);
        }
      }
    }
  }

  sort({ sortBy, sortDirection }) {
    const {
      onSortChange,
    } = this.props;

    if (onSortChange) {
      onSortChange(sortBy + (sortDirection === Table.SORT_DESC ? ' desc' : ''));
    }
  }

  renderNoItems() {
    const {
      isSearchPending,
    } = this.props;

    const message = isSearchPending ? <FormattedMessage {...messages.searchPending} /> : null;

    return <div className={emptyResultStyles.common}>{message}</div>;
  }

  renderTable() {
    const {
      columnSetName,
      config,
      formatCellData,
      formatColumnLabel,
      listType,
      searchDescriptor,
      searchResult,
      showCheckboxColumn,
      renderCheckbox,
    } = this.props;

    if (searchResult) {
      const {
        recordType,
        subresource,
        searchQuery,
      } = searchDescriptor;

      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      let sortColumnName = null;
      let sortDir = null;

      const sortSpec = searchQuery.sort;

      if (sortSpec) {
        [sortColumnName, sortDir] = sortSpec.split(' ');
      }

      const list = searchResult.get(listNodeName);
      const pageSize = parseInt(list.get('pageSize'), 10);
      const totalItems = parseInt(list.get('totalItems'), 10);
      const itemsInPage = parseInt(list.get('itemsInPage'), 10);

      let items = list.get(itemNodeName);

      if (!items) {
        items = Immutable.List();
      }

      if (!Immutable.List.isList(items)) {
        // If there's only one result, it won't be returned as a list.
        items = Immutable.List.of(items);
      }

      const columnConfigurer = subresource
        ? config.subresources[subresource]
        : config.recordTypes[recordType];

      const columnConfig = get(columnConfigurer, ['columns', columnSetName]) || [];

      const columns = columnConfig.map(column => ({
        cellDataGetter: ({ dataKey, rowData }) =>
          formatCellData(column, rowData ? rowData.get(dataKey) : null, rowData),
        disableSort: !isSortable(column, searchDescriptor),
        label: formatColumnLabel(column),
        dataKey: column.dataKey || column.name,
        width: column.width,
      }));

      let heightBasis;

      if (isNaN(totalItems)) {
        // We don't yet know how many items are found by the search. Set the height to one item, so
        // an ellipsis (or other calculating indicator) can be shown.

        heightBasis = 1;
      } else {
        // If all of the search results fit on one page, shrink the table to fit the number of
        // results. Otherwise, size the table to fit the desired page size, even if there aren't
        // that many results on this page. This keeps the pager from jumping up on the last page
        // and while page/sorting changes are in progress.

        heightBasis = (totalItems <= pageSize && !isNaN(itemsInPage)) ? itemsInPage : pageSize;

        if (heightBasis === 0) {
          // If there are no items, set the height to one, because it looks weird when the footer
          // is mashed up against the header. This also leaves room to display a "no records found"
          // message if desired.

          heightBasis = 1;
        }
      }

      const height = (heightBasis * rowHeight) + rowHeight;

      return (
        <div style={{ height }}>
          <Table
            columns={columns}
            rowCount={items.size}
            rowGetter={({ index }) => items.get(index)}
            showCheckboxColumn={showCheckboxColumn}
            onCheckboxChange={this.handleCheckboxChange}
            onRowClick={this.handleRowClick}
            renderCheckbox={renderCheckbox}
            sort={this.sort}
            sortBy={sortColumnName}
            sortDirection={sortDir === 'desc' ? Table.SORT_DESC : Table.SORT_ASC}
            noRowsRenderer={this.renderNoItems}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      isSearchPending,
      searchError,
      searchResult,
      renderHeader,
      renderFooter,
    } = this.props;

    return (
      <div className={styles.common}>
        {renderHeader({ isSearchPending, searchError, searchResult })}
        {this.renderTable()}
        {renderFooter({ isSearchPending, searchError, searchResult })}
      </div>
    );
  }
}

SearchResultTable.propTypes = propTypes;
SearchResultTable.defaultProps = defaultProps;
SearchResultTable.contextTypes = contextTypes;
