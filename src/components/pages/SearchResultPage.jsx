import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import TitleBar from '../sections/TitleBar';
import PageSizeChooser from '../search/PageSizeChooser';
import Pager from '../search/Pager';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';
import styles from '../../../styles/cspace-ui/SearchResultPage.css';

const propTypes = {
  search: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
  router: PropTypes.object,
};

const messages = defineMessages({
  keywordParams: {
    id: 'searchResultPage.keywordParams',
    defaultMessage: '"{keywords}"',
  },
  resultCount: {
    id: 'searchResultPage.resultCount',
    defaultMessage: `{totalItems, plural,
      =0 {No records}
      one {1 record}
      other {{startNum}–{endNum} of {totalItems} records}
    } found`,
  },
});

export default class SearchResultPage extends Component {
  constructor() {
    super();

    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  componentDidMount() {
    this.normalizeQuery() || this.search();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.params.recordType !== prevProps.params.recordType ||
      this.props.params.vocabulary !== prevProps.params.vocabulary ||
      this.props.location.query !== prevProps.location.query
    ) {
      this.normalizeQuery() || this.search();
    }
  }

  normalizeQuery() {
    const {
      query,
    } = this.props.location;

    const {
      router,
    } = this.context;

    if (router) {
      const normalizedQueryParams = {};

      const pageSize = parseInt(query.pgSz, 10);
      
      if (isNaN(pageSize) || pageSize < 1) {
        // TODO: Make default page size configurable
        normalizedQueryParams.pgSz = '40';
      } else if (pageSize.toString() !== query.pgSz) {
        normalizedQueryParams.pgSz = pageSize.toString();
      }

      const pageNum = parseInt(query.pgNum, 10);
      
      if (isNaN(pageNum) || pageNum < 1) {
        normalizedQueryParams.pgNum = '1';
      } else if (pageNum.toString() !== query.pgNum) {
        normalizedQueryParams.pgNum = pageNum.toString();
      }

      if (Object.keys(normalizedQueryParams).length > 0) {
        const newQuery = Object.assign({}, query, normalizedQueryParams);

        router.push({
          pathname: location.pathname,
          query: newQuery,
        });

        return true;
      }
    }

    return false;
  }

  handlePageSelect(pageNum) {
    const {
      location,
    } = this.props;

    const {
      router,
    } = this.context;

    router.push({
      pathname: location.pathname,
      query: Object.assign({}, location.query, {
        pgNum: pageNum + 1,
      }),
    });
  }

  handlePageSizeChange(pageSize) {
    const {
      location,
    } = this.props;

    const {
      router,
    } = this.context;

    router.push({
      pathname: location.pathname,
      query: Object.assign({}, location.query, {
        pgNum: '1',
        pgSz: pageSize
      }),
    });
  }

  search() {
    const {
      location,
      search,
      params,
    } = this.props;

    if (search) {
      const {
        config,
      } = this.context;

      const {
        recordType,
        vocabulary,
      } = params;

      const recordTypeConfig = config.recordTypes[recordType];

      if (recordTypeConfig) {
        search(recordTypeConfig, vocabulary, location.query);
      }
    }
  }

  renderHeader(searchResult) {
    const {
      location,
    } = this.props;

    if (searchResult) {
      const list = searchResult.get('ns2:abstract-common-list');

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);

      const startNum = pageNum * pageSize + 1;
      const endNum = Math.min(pageNum * pageSize + pageSize, totalItems);

      let pageSizeChooser = null;

      if (totalItems > 0) {
        const pageSizeQueryParam = parseInt(location.query.pgSz, 10);

        pageSizeChooser = (
          <PageSizeChooser
            pageSize={pageSizeQueryParam}
            onPageSizeChange={this.handlePageSizeChange}
          />
        );
      }

      return (
        <header>
          <FormattedMessage
            {...messages.resultCount}
            values={{
              totalItems,
              startNum,
              endNum,
            }}
          />
          {pageSizeChooser}
        </header>
      );
    }
  }

  renderFooter(searchResult) {
    if (searchResult) {
      const list = searchResult.get('ns2:abstract-common-list');

      const totalItems = parseInt(list.get('totalItems'), 10);
      const pageNum = parseInt(list.get('pageNum'), 10);
      const pageSize = parseInt(list.get('pageSize'), 10);

      if (totalItems > 0) {
        return (
          <footer>
            <Pager
              currentPage={pageNum}
              lastPage={Math.ceil(totalItems/pageSize) - 1}
              onPageSelect={this.handlePageSelect}
            />
          </footer>
        );
      }
    }
  };

  render() {
    const {
      location,
      params,
    } = this.props;

    const {
      recordType,
    } = params;

    const {
      config,
    } = this.context;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      // TODO: Error page
      return null;
    }

    const keywords = location.query.kw;

    const keywordParamsTitle = keywords
      ? <FormattedMessage {...messages.keywordParams} values={{ keywords }} />
      : null;

    const title = (
      <span>
        <FormattedMessage {...recordTypeConfig.messageDescriptors.resultsTitle} />
        {keywords ? ': ' : null}
        {keywordParamsTitle}
      </span>
    );

    return (
      <div className={styles.common}>
        <TitleBar title={title} />
        <SearchResultTableContainer
          recordType={recordType}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
        />
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.contextTypes = contextTypes;
