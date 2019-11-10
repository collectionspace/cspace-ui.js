import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { Table } from 'cspace-layout';
import dimensions from '../../../styles/dimensions.css';
import styles from '../../../styles/cspace-ui/SearchResultTable.css';
import emptyResultStyles from '../../../styles/cspace-ui/SearchResultEmpty.css';

const rowHeight = parseInt(dimensions.inputHeight, 10);

const messages = defineMessages({
  searchPending: {
    id: 'searchResultTable.searchPending',
    defaultMessage: '⋯',
  },
});

/**
 * Determines if a column is sortable for a given search. A column is sortable if sortBy is truthy,
 * and the search is not constrained by a related record, or if it is, the field to sort by is not
 * complex. This is here to deal with CSPACE-5366 (searches with related record constraints are
 * done using CMIS, which can't see into complex fields). If that bug is ever fixed, then it will
 * suffice just to check sortBy.
 */
const isSortable = (column, searchDescriptor) => {
  const { sortBy } = column;

  return (sortBy && (!searchDescriptor.getIn(['searchQuery', 'rel']) || sortBy.indexOf('/0/') === -1));
};

const rowRenderer = (params, location) => {
  // This is a fork of react-virtualized's default row renderer:
  // https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js

  const {
    className,
    columns,
    index,
    key,
    onRowClick,
    // onRowDoubleClick,
    // onRowMouseOut,
    // onRowMouseOver,
    // onRowRightClick,
    rowData,
    style,
  } = params;

  const a11yProps = {};

  if (
    onRowClick // ||
    // onRowDoubleClick ||
    // onRowMouseOut ||
    // onRowMouseOver ||
    // onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = event => onRowClick({ event, index, rowData });
    }

    // if (onRowDoubleClick) {
    //   a11yProps.onDoubleClick = event =>
    //     onRowDoubleClick({ event, index, rowData });
    // }

    // if (onRowMouseOut) {
    //   a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });
    // }

    // if (onRowMouseOver) {
    //   a11yProps.onMouseOver = event => onRowMouseOver({ event, index, rowData });
    // }

    // if (onRowRightClick) {
    //   a11yProps.onContextMenu = event =>
    //     onRowRightClick({ event, index, rowData });
    // }
  }

  if (location) {
    return (
      <Link
        {...a11yProps}
        className={className}
        key={key}
        role="row"
        style={style}
        to={location}
      >
        {columns}
      </Link>
    );
  }

  return (
    <div
      {...a11yProps}
      className={className}
      data-index={index}
      key={key}
      role="row"
      style={style}
    >
      {columns}
    </div>
  );
};

const propTypes = {
  columnSetName: PropTypes.string,
  config: PropTypes.object.isRequired,
  formatCellData: PropTypes.func,
  formatColumnLabel: PropTypes.func,
  isSearchPending: PropTypes.bool,
  linkItems: PropTypes.bool,
  linkState: PropTypes.object,
  listType: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  renderSelectBar: PropTypes.func,
  getItemLocation: PropTypes.func,
  onItemClick: PropTypes.func,
  onSortChange: PropTypes.func,
};

const defaultProps = {
  columnSetName: 'default',
  formatCellData: (column, data) => data,
  formatColumnLabel: column => get(column, ['messages', 'label', 'defaultMessage']),
  linkItems: true,
  listType: 'common',
  renderHeader: () => null,
  renderFooter: () => null,
  renderSelectBar: () => null,
};

export default class SearchResultTable extends Component {
  constructor() {
    super();

    this.getItemLocation = this.getItemLocation.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.renderNoItems = this.renderNoItems.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.sort = this.sort.bind(this);
  }

  getItemLocation(item) {
    const {
      config,
      linkState,
      listType,
      perms,
      searchDescriptor,
    } = this.props;

    const getItemLocationPath = get(config, ['listTypes', listType, 'getItemLocationPath']);

    if (!getItemLocationPath) {
      return undefined;
    }

    const itemContext = { config, perms, searchDescriptor };
    const itemLocationPath = getItemLocationPath(item, itemContext);

    if (!itemLocationPath) {
      return undefined;
    }

    // Create a location with the item location path, along with enough state to reproduce this
    // search. The search descriptor is converted to an object in order to reliably store it in
    // location state. Also merge in any object that was passed in via the linkState prop.

    const state = Object.assign({
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: 'searchResultPage',
    }, linkState);

    return {
      state,
      pathname: itemLocationPath,
    };
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      const index = get(event, ['target', 'dataset', 'index']);

      if (typeof index !== 'undefined') {
        this.handleRowClick(event.target.dataset.index);
      }
    }
  }

  handleRowClick(index) {
    const {
      config,
      listType,
      searchResult,
      onItemClick,
    } = this.props;

    if (onItemClick) {
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      const items = searchResult.getIn([listNodeName, itemNodeName]);
      const item = Immutable.List.isList(items) ? items.get(index) : items;

      onItemClick(item, index);
    }
  }

  sort({ sortBy, sortDirection }) {
    const {
      onSortChange,
    } = this.props;

    if (onSortChange) {
      onSortChange(sortBy + (sortDirection === Table.SortDirection.DESC ? ' desc' : ''));
    }
  }

  renderNoItems() {
    const {
      isSearchPending,
    } = this.props;

    const message = isSearchPending ? <FormattedMessage {...messages.searchPending} /> : null;

    return <div className={emptyResultStyles.common}>{message}</div>;
  }

  renderRow(params) {
    const {
      getItemLocation,
      linkItems,
    } = this.props;

    const {
      rowData,
    } = params;

    let location;

    if (linkItems) {
      const locationGetter = getItemLocation || this.getItemLocation;

      location = locationGetter(rowData);
    }

    return rowRenderer(params, location);
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
      const recordType = searchDescriptor.get('recordType');
      const subresource = searchDescriptor.get('subresource');
      const searchQuery = searchDescriptor.get('searchQuery');

      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      let sortColumnName = null;
      let sortDir = null;

      const sortSpec = searchQuery.get('sort');

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

      let columnConfig = get(columnConfigurer, ['columns', columnSetName]);

      if (!columnConfig && columnSetName !== defaultProps.columnSetName) {
        // Fall back to the default column set if the named one doesn't exist.

        columnConfig = get(columnConfigurer, ['columns', defaultProps.columnSetName]);
      }

      if (!columnConfig) {
        columnConfig = [];
      }

      const columns = Object.keys(columnConfig)
        .filter(name => !columnConfig[name].disabled)
        .sort((nameA, nameB) => {
          const orderA = columnConfig[nameA].order;
          const orderB = columnConfig[nameB].order;

          return orderA - orderB;
        })
        .map((name) => {
          const column = columnConfig[name];

          return {
            cellDataGetter: ({ dataKey, rowData }) => {
              let data = null;

              if (rowData) {
                const keys = dataKey.split('|');

                for (let i = 0; i < keys.length; i += 1) {
                  const candidateValue = rowData.get(keys[i]);

                  if (candidateValue) {
                    data = candidateValue;
                    break;
                  }
                }
              }

              return formatCellData(column, data, rowData);
            },
            disableSort: !isSortable(column, searchDescriptor),
            flexGrow: column.flexGrow,
            flexShrink: column.flexShrink,
            label: formatColumnLabel(column),
            dataKey: column.dataKey || name,
            width: column.width,
          };
        });

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
            onRowClick={this.handleRowClick}
            renderCheckbox={renderCheckbox}
            sort={this.sort}
            sortBy={sortColumnName}
            sortDirection={sortDir === 'desc' ? Table.SortDirection.DESC : Table.SortDirection.ASC}
            noRowsRenderer={this.renderNoItems}
            rowRenderer={this.renderRow}
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
      renderSelectBar,
      renderFooter,
    } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={styles.common}
        role="presentation"
        onKeyDown={this.handleKeyDown}
      >
        {renderHeader({ isSearchPending, searchError, searchResult })}
        {renderSelectBar()}
        {this.renderTable()}
        {renderFooter({ isSearchPending, searchError, searchResult })}
      </div>
    );
  }
}

SearchResultTable.propTypes = propTypes;
SearchResultTable.defaultProps = defaultProps;
