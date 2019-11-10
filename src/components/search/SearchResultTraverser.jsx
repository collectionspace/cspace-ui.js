import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import SearchResultItemLink from './SearchResultItemLink';

import {
  getListType,
  searchDescriptorToLocation,
} from '../../helpers/searchHelpers';

import styles from '../../../styles/cspace-ui/SearchResultTraverser.css';

const messages = defineMessages({
  result: {
    id: 'searchResultTraverser.result',
    description: 'Label of the search result link in the search result traverser.',
    defaultMessage: 'Search result {current, number} of {total, number}',
  },
  resultPending: {
    id: 'searchResultTraverser.resultPending',
    description: 'Label of the search result link in the search result traverser when the search is pending.',
    defaultMessage: 'Search result … of …',
  },
  prev: {
    id: 'searchResultTraverser.prev',
    description: 'Label of the previous record link in the search result traverser.',
    defaultMessage: 'Previous',
  },
  next: {
    id: 'searchResultTraverser.next',
    description: 'Label of the next record link in the search result traverser.',
    defaultMessage: 'Next',
  },
});

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  searchName: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchState: PropTypes.instanceOf(Immutable.Map),
  nextPageSearchDescriptor: PropTypes.object,
  nextPageSearchState: PropTypes.instanceOf(Immutable.Map),
  prevPageSearchDescriptor: PropTypes.object,
  prevPageSearchState: PropTypes.instanceOf(Immutable.Map),
  originSearchPageState: PropTypes.object,
  search: PropTypes.func,
};

export default class SearchResultTraverser extends Component {
  componentDidMount() {
    this.initiateSearch();
  }

  componentDidUpdate() {
    this.initiateSearch();
  }

  initiateSearch() {
    const {
      config,
      csid,
      searchDescriptor,
      searchState,
      nextPageSearchDescriptor,
      nextPageSearchState,
      prevPageSearchDescriptor,
      prevPageSearchState,
      searchName,
      search,
    } = this.props;


    if (search) {
      if (searchDescriptor && !searchState) {
        // We have a search descriptor, but it's not associated with any state. This happens when
        // navigating to a record from a search, and reloading -- the search descriptor is
        // maintained in history state, but the search state is gone, since the app has been
        // reloaded. Initiate the search.

        search(config, searchName, searchDescriptor, getListType(config, searchDescriptor));
      }

      if (searchState && !searchState.get('isPending') && searchState.get('result')) {
        const listType = getListType(config, searchDescriptor);
        const listTypeConfig = config.listTypes[listType];
        const { listNodeName, itemNodeName } = listTypeConfig;

        const indexesByCsid = searchState.get('indexesByCsid');
        const index = indexesByCsid.get(csid);

        const result = searchState.get('result');
        const list = result.get(listNodeName);

        const totalItems = list.get('totalItems');

        const pageNum = list.get('pageNum');
        const pageSize = list.get('pageSize');

        const currentNum = (pageNum * pageSize) + index + 1;

        const prevIndex = index - 1;
        const nextIndex = index + 1;

        let items = list.get(itemNodeName);

        if (items && !Immutable.List.isList(items)) {
          items = Immutable.List.of(items);
        }

        if (
          !prevPageSearchState &&
          (prevIndex < 0) &&
          (currentNum > 1) &&
          prevPageSearchDescriptor
        ) {
          // The previous page has not been retrieved, and we're on the first item of the current
          // page. Initiate the search for the previous page.

          search(
            config,
            searchName,
            prevPageSearchDescriptor,
            getListType(config, prevPageSearchDescriptor)
          );
        }

        if (
          !nextPageSearchState &&
          (nextIndex > (items.size - 1)) &&
          (currentNum < totalItems) &&
          nextPageSearchDescriptor
        ) {
          // The next page has not been retrieved, and we're on the last item of the current page.
          // Initiate the search for the next page.

          search(
            config,
            searchName,
            nextPageSearchDescriptor,
            getListType(config, nextPageSearchDescriptor)
          );
        }
      }
    }
  }

  renderPrevLink(items, index, currentNum, totalItems, locationState) {
    const {
      config,
      searchName,
      prevPageSearchState,
      prevPageSearchDescriptor,
    } = this.props;

    const prevIndex = index - 1;

    if (prevIndex >= 0) {
      return (
        <SearchResultItemLink
          rel="prev"
          config={config}
          item={items.get(prevIndex)}
          message={messages.prev}
          state={locationState}
        />
      );
    }

    if (prevPageSearchState && !prevPageSearchState.get('isPending') && prevPageSearchState.get('result')) {
      // We're at the beginning of the current page, but we have data for the previous page. Link
      // to the last item in its results.

      const listType = getListType(config, prevPageSearchDescriptor);
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      let prevPageItems = prevPageSearchState.getIn(['result', listNodeName, itemNodeName]);

      if (prevPageItems && !Immutable.List.isList(prevPageItems)) {
        prevPageItems = Immutable.List.of(prevPageItems);
      }

      return (
        <SearchResultItemLink
          rel="prev"
          config={config}
          item={prevPageItems.last()}
          message={messages.prev}
          state={{
            searchName,
            searchDescriptor: prevPageSearchDescriptor.toJS(),
          }}
        />
      );
    }

    if (currentNum > 1) {
      // We don't have data for the previous page, but there is one. Show a placeholder link.

      return <a rel="prev"><FormattedMessage {...messages.prev} /></a>;
    }

    // We're on the first item of all pages. Show a placeholder link.

    return <a rel="prev"><FormattedMessage {...messages.prev} /></a>;
  }

  renderNextLink(items, index, currentNum, totalItems, locationState) {
    const {
      config,
      searchName,
      nextPageSearchState,
      nextPageSearchDescriptor,
    } = this.props;

    const nextIndex = index + 1;

    if (nextIndex <= (items.size - 1)) {
      return (
        <SearchResultItemLink
          rel="next"
          config={config}
          item={items.get(nextIndex)}
          message={messages.next}
          state={locationState}
        />
      );
    }

    if (nextPageSearchState && !nextPageSearchState.get('isPending') && nextPageSearchState.get('result')) {
      // We're at the end of the current page, but we have data for the next page. Link to the
      // first item in its results.

      const listType = getListType(config, nextPageSearchDescriptor);
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      let nextPageItems = nextPageSearchState.getIn(['result', listNodeName, itemNodeName]);

      if (nextPageItems && !Immutable.List.isList(nextPageItems)) {
        nextPageItems = Immutable.List.of(nextPageItems);
      }

      return (
        <SearchResultItemLink
          rel="next"
          config={config}
          item={nextPageItems.first()}
          message={messages.next}
          state={{
            searchName,
            searchDescriptor: nextPageSearchDescriptor.toJS(),
          }}
        />
      );
    }

    if (currentNum < totalItems) {
      // We don't have data for the next page, but there is one. Show a placeholder link.

      return <a rel="next"><FormattedMessage {...messages.next} /></a>;
    }

    // We're on the last item of all pages. Show a placeholder link.

    return <a rel="next"><FormattedMessage {...messages.next} /></a>;
  }

  render() {
    const {
      config,
      csid,
      searchDescriptor,
      searchName,
      searchState,
      originSearchPageState,
    } = this.props;

    if (!searchDescriptor) {
      return null;
    }

    let resultMessage;
    let prevLink;
    let nextLink;

    if (
      !searchState ||
      searchState.get('isPending') ||
      searchState.get('error')
    ) {
      resultMessage = <FormattedMessage {...messages.resultPending} />;
    } else {
      const listType = getListType(config, searchDescriptor);
      const listTypeConfig = config.listTypes[listType];
      const { listNodeName, itemNodeName } = listTypeConfig;

      const indexesByCsid = searchState.get('indexesByCsid');
      const index = indexesByCsid.get(csid);

      const result = searchState.get('result');
      const list = result.get(listNodeName);

      const totalItems = list.get('totalItems');

      const pageNum = list.get('pageNum');
      const pageSize = list.get('pageSize');

      const currentNum = (pageNum * pageSize) + index + 1;

      resultMessage = (
        <FormattedMessage
          {...messages.result}
          values={{ current: currentNum, total: totalItems }}
        />
      );

      let items = result.getIn([listNodeName, itemNodeName]);

      if (items && !Immutable.List.isList(items)) {
        items = Immutable.List.of(items);
      }

      const locationState = {
        searchName,
        searchDescriptor: searchDescriptor.toJS(),
        originSearchPage: originSearchPageState,
      };

      prevLink = this.renderPrevLink(items, index, currentNum, totalItems, locationState);
      nextLink = this.renderNextLink(items, index, currentNum, totalItems, locationState);
    }

    const searchLocation = Object.assign(searchDescriptorToLocation(searchDescriptor), {
      state: {
        originSearchPage: originSearchPageState,
      },
    });

    return (
      <nav className={styles.common}>
        <div>
          <Link rel="search" to={searchLocation}>
            {resultMessage}
          </Link>
        </div>
        <div>
          {prevLink}
          {prevLink && nextLink ? ' | ' : null}
          {nextLink}
        </div>
      </nav>
    );
  }
}

SearchResultTraverser.propTypes = propTypes;
