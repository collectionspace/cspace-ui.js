import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Table } from 'cspace-layout';
import { WindowScroller } from 'react-virtualized';
import { getRecordTypeByServiceObjectName } from '../../helpers/configHelpers';
import styles from '../../../styles/cspace-ui/SearchResultTable.css';

const propTypes = {
  formatCellData: PropTypes.func,
  formatColumnLabel: PropTypes.func,
  recordType: PropTypes.string,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
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
  }

  handleRowClick(index) {
    const{
      recordType,
      searchResult,
    } = this.props;

    const {
      router,
    } = this.context;

    if (searchResult && router) {
      const items = searchResult.getIn(['ns2:abstract-common-list', 'list-item']);

      if (items) {
        const item = Immutable.List.isList(items) ? items.get(index) : items;
        const docType = item.get('docType');

        let recordTypeName;

        if (docType) {
          const recordTypeConfig = getRecordTypeByServiceObjectName(this.context.config, docType);

          if (recordTypeConfig) {
            recordTypeName = recordTypeConfig.name;
          }
        }

        if (!recordTypeName) {
          recordTypeName = recordType;
        }

        if (recordTypeName) {
          const csid = item.get('csid');

          router.push(`/record/${recordTypeName}/${csid}`);
        }
      }
    }
  }

  renderTable() {
    const {
      formatCellData,
      formatColumnLabel,
      recordType,
      searchResult,
    } = this.props;

    const {
      config,
    } = this.context;

    if (searchResult) {
      const list = searchResult.get('ns2:abstract-common-list');
      const totalItems = parseInt(list.get('totalItems'), 10);

      if (totalItems > 0) {
        const recordTypeConfig = config.recordTypes[recordType];

        let items= list.get('list-item');

        if (!items) {
          items = Immutable.List();
        }

        if (!Immutable.List.isList(items)) {
          // If there's only one result, it won't be returned as a list.
          items = Immutable.List.of(items);
        }

        const columnConfig = get(recordTypeConfig, ['columns', 'search']) || [];

        const columns = columnConfig.map((column) => {
          return {
            cellDataGetter: ({ columnData, dataKey, rowData }) =>
              formatCellData(column, rowData ? rowData.get(dataKey) : null),
            label: formatColumnLabel(column),
            dataKey: column.name,
            width: column.width,
          };
        });

        const height = items.size * rowHeight + rowHeight;

        return (
          <div style={{ height }}>
            <Table
              columns={columns}
              rowCount={items.size}
              rowGetter={({ index }) => items.get(index)}
              onRowClick={this.handleRowClick}
            />
          </div>
        );
      }
    }
  }

  render() {
    const {
      searchResult,
      renderHeader,
      renderFooter,
    } = this.props;

    return (
      <div className={styles.common}>
        {renderHeader(searchResult)}
        {this.renderTable()}
        {renderFooter(searchResult)}
      </div>
    );
  }
}

SearchResultTable.propTypes = propTypes;
SearchResultTable.defaultProps = defaultProps;
SearchResultTable.contextTypes = contextTypes;
