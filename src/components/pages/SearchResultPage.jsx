import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { locationShape, routerShape } from 'react-router/lib/PropTypes';
import TitleBar from '../sections/TitleBar';
import CsidLink from '../navigation/CsidLink';
import PageSizeChooser from '../search/PageSizeChooser';
import Pager from '../search/Pager';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import styles from '../../../styles/cspace-ui/SearchResultPage.css';
import headerStyles from '../../../styles/cspace-ui/Header.css';

const messages = defineMessages({
  keywordQuery: {
    id: 'searchResultPage.keywordQuery',
    defaultMessage: 'containing "{keyword}"',
  },
  relatedQuery: {
    id: 'searchResultPage.relatedQuery',
    defaultMessage: 'related to {record}',
  },
  resultCount: {
    id: 'searchResultPage.resultCount',
    defaultMessage: `{totalItems, plural,
      =0 {No records}
      one {1 record}
      other {{startNum}–{endNum} of {totalItems} records}
    } found`,
  },
  searching: {
    id: 'searchResultPage.searching',
    defaultMessage: 'Finding records...',
  },
});

export const searchName = 'searchResultPage';

const propTypes = {
  listType: PropTypes.string,
  location: locationShape,
  params: PropTypes.objectOf(PropTypes.string),
  preferredPageSize: PropTypes.number,
  search: PropTypes.func,
  setPreferredPageSize: PropTypes.func,
};

const defaultProps = {
  listType: 'common',
};

const contextTypes = {
  config: PropTypes.object.isRequired,
  router: routerShape,
};

export default class SearchResultPage extends Component {
  constructor() {
    super();

    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    if (!this.normalizeQuery()) {
      this.search();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.params.recordType !== prevProps.params.recordType ||
      this.props.params.vocabulary !== prevProps.params.vocabulary ||
      this.props.params.csid !== prevProps.params.csid ||
      this.props.params.subresource !== prevProps.params.subresource ||
      this.props.location.query !== prevProps.location.query
    ) {
      if (!this.normalizeQuery()) {
        this.search();
      }
    }
  }

  getSearchDescriptor() {
    const {
      location,
      params,
    } = this.props;

    const searchQuery = Object.assign({}, location.query, {
      p: parseInt(location.query.p, 10) - 1,
      size: parseInt(location.query.size, 10),
    });

    const searchDescriptor = {
      searchQuery,
    };

    ['recordType', 'vocabulary', 'csid', 'subresource'].forEach((param) => {
      const value = params[param];

      if (typeof value !== 'undefined') {
        searchDescriptor[param] = value;
      }
    });

    return searchDescriptor;
  }

  normalizeQuery() {
    const {
      location,
      preferredPageSize,
    } = this.props;

    const {
      query,
    } = location;

    const {
      router,
    } = this.context;

    if (router) {
      const normalizedQueryParams = {};

      const pageSize = parseInt(query.size, 10);

      if (isNaN(pageSize) || pageSize < 1) {
        // FIXME: Make default page size configurable
        const defaultPageSize = 20;
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

        router.replace({
          pathname: location.pathname,
          query: newQuery,
        });

        return true;
      }
    }

    return false;
  }

  handlePageChange(pageNum) {
    const {
      location,
    } = this.props;

    const {
      router,
    } = this.context;

    if (router) {
      router.push({
        pathname: location.pathname,
        query: Object.assign({}, location.query, {
          p: (pageNum + 1).toString(),
        }),
      });
    }
  }

  handlePageSizeChange(pageSize) {
    const {
      location,
      setPreferredPageSize,
    } = this.props;

    const {
      router,
    } = this.context;

    if (setPreferredPageSize) {
      setPreferredPageSize(pageSize);
    }

    if (router) {
      router.push({
        pathname: location.pathname,
        query: Object.assign({}, location.query, {
          p: '1',
          size: pageSize.toString(),
        }),
      });
    }
  }

  handleSortChange(sort) {
    const {
      location,
    } = this.props;

    const {
      router,
    } = this.context;

    if (router) {
      router.push({
        pathname: location.pathname,
        query: Object.assign({}, location.query, {
          sort,
        }),
      });
    }
  }

  search() {
    const {
      listType,
      search,
    } = this.props;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();

    if (search) {
      search(config, searchName, searchDescriptor, listType);
    }
  }

  renderHeader({ searchError, searchResult }) {
    if (searchError) {
      // FIXME: Make a proper error page
      const errorMessage = searchError.get('code') || '';

      return (
        <header className={headerStyles.common}>Error: {errorMessage}</header>
      );
    }

    const {
      location,
    } = this.props;

    let message = null;
    let pageSizeChooser = null;

    const pageSizeQueryParam = parseInt(location.query.size, 10);

    pageSizeChooser = (
      <PageSizeChooser
        pageSize={pageSizeQueryParam}
        onPageSizeChange={this.handlePageSizeChange}
      />
    );

    if (searchResult) {
      const {
        listType,
      } = this.props;

      const {
        config,
      } = this.context;

      const listTypeConfig = config.listTypes[listType];
      const { listNodeName } = listTypeConfig;

      const list = searchResult.get(listNodeName);
      const totalItems = parseInt(list.get('totalItems'), 10);

      if (isNaN(totalItems)) {
        message = (
          <FormattedMessage {...messages.searching} />
        );
      } else {
        const pageNum = parseInt(list.get('pageNum'), 10);
        const pageSize = parseInt(list.get('pageSize'), 10);

        const startNum = (pageNum * pageSize) + 1;
        const endNum = Math.min((pageNum * pageSize) + pageSize, totalItems);

        message = (
          <FormattedMessage
            {...messages.resultCount}
            values={{
              totalItems,
              startNum,
              endNum,
            }}
          />
        );
      }
    }

    return (
      <header className={headerStyles.common}>
        {message}
        {pageSizeChooser}
      </header>
    );
  }

  renderFooter({ searchResult }) {
    if (searchResult) {
      const {
        listType,
      } = this.props;

      const {
        config,
      } = this.context;

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
      listType,
    } = this.props;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();

    const {
      recordType,
      vocabulary,
      csid,
      subresource,
    } = searchDescriptor;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      // FIXME: Make a proper error page
      return (
        <div className={styles.common}>
          <TitleBar title="Error: Unknown record type" />
        </div>
      );
    }

    let vocabularyConfig;

    if (vocabulary) {
      vocabularyConfig = recordTypeConfig.vocabularies[vocabulary];

      if (!vocabularyConfig) {
        // FIXME: Make a proper error page
        return (
          <div className={styles.common}>
            <TitleBar title="Error: Unknown vocabulary" />
          </div>
        );
      }
    }

    let subresourceConfig;

    if (subresource) {
      subresourceConfig = config.subresources[subresource];

      if (!subresourceConfig) {
        // FIXME: Make a proper error page
        return (
          <div className={styles.common}>
            <TitleBar title="Error: Unknown subresource" />
          </div>
        );
      }
    }

    const {
      kw,
      rel,
    } = searchDescriptor.searchQuery;

    const keywordQueryTitle = kw
      ? <FormattedMessage {...messages.keywordQuery} values={{ keyword: kw }} />
      : null;

    let relatedQueryTitle = null;

    if (rel) {
      const recordLink = <CsidLink config={config} searchName={`${searchName}.rel`} csid={rel} />;

      relatedQueryTitle = (
        <FormattedMessage
          {...messages.relatedQuery}
          values={{ record: recordLink }}
        />
      );
    }

    let collectionName;

    if (subresourceConfig) {
      const recordLink = <CsidLink config={config} searchName={`${searchName}.csid`} csid={csid} />;

      collectionName = (
        <FormattedMessage
          {...subresourceConfig.messages.collectionName}
          values={{ record: recordLink }}
        />
      );
    } else if (vocabularyConfig) {
      collectionName = (
        <FormattedMessage
          {...vocabularyConfig.messages.collectionName}
        />
      );
    } else {
      collectionName = (
        <FormattedMessage
          {...recordTypeConfig.messages.record.collectionName}
        />
      );
    }

    const title = (
      <span>
        {collectionName}
        {' '}{keywordQueryTitle}
        {' '}{relatedQueryTitle}
      </span>
    );

    return (
      <div className={styles.common}>
        <TitleBar title={title} />
        <SearchResultTableContainer
          listType={listType}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          recordType={recordType}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          onSortChange={this.handleSortChange}
        />
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.defaultProps = defaultProps;
SearchResultPage.contextTypes = contextTypes;
