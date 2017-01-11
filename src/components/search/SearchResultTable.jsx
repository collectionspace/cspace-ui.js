import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Table } from 'cspace-layout';
import { getRecordTypeByServiceObjectName } from '../../helpers/configHelpers';
import styles from '../../../styles/cspace-ui/SearchResultTable.css';

const propTypes = {
  formatCellData: PropTypes.func,
  formatColumnLabel: PropTypes.func,
  isSearchPending: PropTypes.bool,
  searchDescriptor: PropTypes.object,
  searchError: PropTypes.instanceOf(Error),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  onSortChange: PropTypes.func,
};

const defaultProps = {
  formatCellData: (column, data) => data,
  formatColumnLabel: column => column.messages.label.defaultMessage,
  renderHeader: () => null,
  renderFooter: () => null,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
  router: PropTypes.object,
};

const rowHeight = 22;

export default class SearchResultTable extends Component {
  constructor() {
    super();

    this.handleRowClick = this.handleRowClick.bind(this);
    this.sort = this.sort.bind(this);
  }

  handleRowClick(index) {
    const {
      searchDescriptor,
      searchResult,
    } = this.props;

    const {
      config,
      router,
    } = this.context;

    if (searchResult && router) {
      const items = searchResult.getIn(['ns2:abstract-common-list', 'list-item']);
      const item = Immutable.List.isList(items) ? items.get(index) : items;
      const docType = item.get('docType');

      let recordTypeName;

      if (docType) {
        const recordTypeConfig = getRecordTypeByServiceObjectName(config, docType);

        if (recordTypeConfig) {
          recordTypeName = recordTypeConfig.name;
        }
      }

      if (!recordTypeName) {
        recordTypeName = searchDescriptor.recordType;
      }

      if (recordTypeName) {
        const csid = item.get('csid');

        router.push(`/record/${recordTypeName}/${csid}`);
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

  renderTable() {
    const {
      formatCellData,
      formatColumnLabel,
      searchDescriptor,
      searchResult,
    } = this.props;

    const {
      config,
    } = this.context;

    if (searchResult) {
      let sortColumnName = null;
      let sortDir = null;

      const sortSpec = searchDescriptor.searchQuery.sort;

      if (sortSpec) {
        [sortColumnName, sortDir] = sortSpec.split(' ');
      }

      const list = searchResult.get('ns2:abstract-common-list');
      const pageSize = parseInt(list.get('pageSize'), 10);
      const totalItems = parseInt(list.get('totalItems'), 10);

      if (totalItems > 0) {
        const recordTypeConfig = config.recordTypes[searchDescriptor.recordType];

        let items = list.get('list-item');

        if (!items) {
          items = Immutable.List();
        }

        if (!Immutable.List.isList(items)) {
          // If there's only one result, it won't be returned as a list.
          items = Immutable.List.of(items);
        }

        const columnConfig = get(recordTypeConfig, ['columns', 'search']) || [];

        const columns = columnConfig.map(column => ({
          cellDataGetter: ({ dataKey, rowData }) =>
            formatCellData(column, rowData ? rowData.get(dataKey) : null),
          disableSort: !column.sortBy,
          label: formatColumnLabel(column),
          dataKey: column.name,
          width: column.width,
        }));

        // If there's more than one page, maintain the same table height on all pages for
        // continuity. This way the last page, if it has fewer items, doesn't get shorter, causing
        // the paging links to jump up. But if there's only one page, shrink the table to fit the
        // number of results, so the paging links aren't unnecessarily far down.

        const heightBasis = (totalItems <= pageSize ? items.size : pageSize);
        const height = (heightBasis * rowHeight) + rowHeight;

        return (
          <div style={{ height }}>
            <Table
              columns={columns}
              rowCount={items.size}
              rowGetter={({ index }) => items.get(index)}
              onRowClick={this.handleRowClick}
              sort={this.sort}
              sortBy={sortColumnName}
              sortDirection={sortDir === 'desc' ? Table.SORT_DESC : Table.SORT_ASC}
            />
          </div>
        );
      }
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
