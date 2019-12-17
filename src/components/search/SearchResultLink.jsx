import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import SearchResultItemLink from './SearchResultItemLink';

const messages = defineMessages({
  pending: {
    id: 'searchResultLink.pending',
    defaultMessage: '...',
  },
  error: {
    id: 'searchResultLink.error',
    defaultMessage: '...',
  },
  notFound: {
    id: 'searchResultLink.notFound',
    defaultMessage: '[record not found]',
  },
  label: {
    id: 'searchResultLink.label',
    defaultMessage: '{recordNumber}',
  },
});

const propTypes = {
  config: PropTypes.shape({
    listTypes: PropTypes.object,
  }),
  listType: PropTypes.string,
  search: PropTypes.func,
  searchName: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  itemFilter: PropTypes.func,
  isSearchPending: PropTypes.bool,
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  listType: 'common',
  itemFilter: () => true,
};

export default class SearchResultLink extends Component {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    const {
      searchName,
      searchDescriptor,
    } = this.props;

    const {
      searchName: prevSearchName,
      searchDescriptor: prevSearchDescriptor,
    } = prevProps;

    if (searchName !== prevSearchName || !Immutable.is(searchDescriptor, prevSearchDescriptor)) {
      this.search();
    }
  }

  getResultItem() {
    const {
      config,
      searchResult,
      itemFilter,
      listType,
    } = this.props;

    const {
      listNodeName,
      itemNodeName,
    } = config.listTypes[listType];

    const list = searchResult.get(listNodeName);
    const totalItems = parseInt(list.get('totalItems'), 10);

    if (Number.isNaN(totalItems) || totalItems === 0) {
      return null;
    }

    let items = list.get(itemNodeName);

    if (!Immutable.List.isList(items)) {
      items = Immutable.List.of(items);
    }

    return items.find(itemFilter);
  }

  search() {
    const {
      config,
      search,
      searchName,
      searchDescriptor,
    } = this.props;

    if (search) {
      search(config, searchName, searchDescriptor);
    }
  }

  render() {
    const {
      config,
      isSearchPending,
      searchError,
      searchResult,
    } = this.props;

    if (isSearchPending) {
      return (
        <FormattedMessage {...messages.pending} />
      );
    }

    if (searchResult) {
      const item = this.getResultItem();

      if (item) {
        return (
          <SearchResultItemLink
            config={config}
            item={item}
            message={messages.label}
          />
        );
      }

      return (
        <FormattedMessage {...messages.notFound} />
      );
    }

    if (searchError) {
      return (
        <FormattedMessage {...messages.error} />
      );
    }

    return null;
  }
}

SearchResultLink.propTypes = propTypes;
SearchResultLink.defaultProps = defaultProps;
