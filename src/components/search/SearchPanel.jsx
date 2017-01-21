import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import Pager from './Pager';

const messages = defineMessages({
  titleWithCount: {
    id: 'searchPanel.titleWithCount',
    defaultMessage: '{title}: {totalItems}',
  },
});

const propTypes = {
  collapsed: PropTypes.bool,
  columnSetName: PropTypes.string,
  config: PropTypes.object,
  recordType: PropTypes.string,
  searchName: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  title: PropTypes.node,
  search: PropTypes.func,
  onSearchDescriptorChange: PropTypes.func,
};

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.renderFooter = this.renderFooter.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const {
      searchDescriptor: prevSearchDescriptor,
    } = prevProps;

    const {
      searchDescriptor,
    } = this.props;

    if (!isEqual(prevSearchDescriptor, searchDescriptor)) {
      this.search();
    }
  }

  handlePageSelect(pageNum) {
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
      onSearchDescriptorChange,
      searchDescriptor,
    } = this.props;

    if (onSearchDescriptorChange) {
      onSearchDescriptorChange(merge({}, searchDescriptor, {
        searchQuery: {
          p: 0,
          size: pageSize,
        },
      }));
    }
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
      config,
      search,
      searchDescriptor,
      searchName,
    } = this.props;

    if (search) {
      search(config, searchName, searchDescriptor);
    }
  }

  renderHeader() {
    const {
      searchResult,
      title,
    } = this.props;

    const totalItems = searchResult
      ? searchResult.getIn(['ns2:abstract-common-list', 'totalItems'])
      : null;

    const headerContent = (typeof totalItems !== 'undefined' && totalItems !== null)
      ? <FormattedMessage {...messages.titleWithCount} values={{ title, totalItems }} />
      : title;

    return (
      <h3>{headerContent}</h3>
    );
  }

  renderFooter({ searchResult }) {
    if (searchResult) {
      const list = searchResult.get('ns2:abstract-common-list');

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);
      const lastPage = Math.max(0, isNaN(totalItems) ? 0 : Math.ceil(totalItems / pageSize) - 1);

      return (
        <footer>
          <Pager
            currentPage={pageNum}
            lastPage={lastPage}
            windowSize={1}
            onPageSelect={this.handlePageSelect}
          />
        </footer>
      );
    }

    return null;
  }

  render() {
    const {
      collapsed,
      columnSetName,
      config,
      recordType,
      searchDescriptor,
      searchName,
    } = this.props;

    return (
      <Panel
        collapsible
        collapsed={collapsed}
        config={config}
        header={this.renderHeader()}
        name={searchName}
        recordType={recordType}
      >
        <SearchResultTableContainer
          columnSetName={columnSetName}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          renderFooter={this.renderFooter}
          onSortChange={this.handleSortChange}
        />
      </Panel>
    );
  }
}

SearchPanel.propTypes = propTypes;
