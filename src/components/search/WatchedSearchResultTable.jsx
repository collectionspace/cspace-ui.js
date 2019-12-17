import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchResultTableContainer from '../../containers/search/SearchResultTableContainer';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
  onSearchDescriptorChange: PropTypes.func,
};

/**
 * A wrapper around SearchResultTable that notifies when the search descriptor is changed, and
 * re-executes the search if the search results are cleared.
 */
export default class WatchedSearchResultTable extends Component {
  componentDidUpdate(prevProps) {
    const {
      searchDescriptor: prevSearchDescriptor,
      searchResult: prevSearchResult,
    } = prevProps;

    const {
      search,
      searchDescriptor,
      searchError,
      searchResult,
      onSearchDescriptorChange,
    } = this.props;

    if (onSearchDescriptorChange && !Immutable.is(prevSearchDescriptor, searchDescriptor)) {
      onSearchDescriptorChange(searchDescriptor);
    }

    if (search && (typeof searchResult === 'undefined' && prevSearchResult && !searchError)) {
      search();
    }
  }

  render() {
    const {
      onSearchDescriptorChange,
      search,
      ...remainingProps
    } = this.props;

    return (
      <SearchResultTableContainer
        {...remainingProps}
      />
    );
  }
}

WatchedSearchResultTable.propTypes = propTypes;
