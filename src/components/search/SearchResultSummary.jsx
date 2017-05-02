import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import PageSizeChooser from './PageSizeChooser';
import styles from '../../../styles/cspace-ui/SearchResultSummary.css';

const messages = defineMessages({
  error: {
    id: 'searchResultSummary.error',
    defaultMessage: 'Error: {message}',
  },
  editSearch: {
    id: 'searchResultSummary.editSearch',
    defaultMessage: 'Revise search',
  },
});

const propTypes = {
  config: PropTypes.object,
  listType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  renderEditLink: PropTypes.func,
  onEditSearchLinkClick: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

const defaultProps = {
  renderEditLink: (searchDescriptor, onEditSearchLinkClick) => {
    const {
      recordType,
      vocabulary,
      subresource,
      searchQuery,
    } = searchDescriptor;

    if (subresource || searchQuery.rel) {
      // Services layer does not allow combining related record searches or subresource
      // (terms/refs) searches with keywords or advanced search conditions, so don't render an edit
      // search link.

      return null;
    }

    const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
    const path = `/search/${recordType}${vocabularyPath}`;

    return (
      <Link to={path} onClick={onEditSearchLinkClick}>
        <FormattedMessage {...messages.editSearch} />
      </Link>
    );
  },
};

export default function SearchResultSummary(props) {
  const {
    config,
    listType,
    searchDescriptor,
    searchError,
    searchResult,
    renderEditLink,
    onEditSearchLinkClick,
    onPageSizeChange,
  } = props;

  if (searchError) {
    // FIXME: Make a proper error page
    const message = searchError.get('code') || '';

    return (
      <div className={styles.error}>
        <FormattedMessage {...messages.error} values={{ message }} />
        <p>{renderEditLink(searchDescriptor, onEditSearchLinkClick)}</p>
      </div>
    );
  }

  let message = null;
  let pageSize = null;

  if (searchResult) {
    const listTypeConfig = config.listTypes[listType];
    const { listNodeName } = listTypeConfig;

    const list = searchResult.get(listNodeName);
    const totalItems = parseInt(list.get('totalItems'), 10);

    if (isNaN(totalItems)) {
      message = (
        <FormattedMessage {...listTypeConfig.messages.searching} />
      );
    } else {
      const pageNum = parseInt(list.get('pageNum'), 10);

      pageSize = parseInt(list.get('pageSize'), 10);

      const startNum = (pageNum * pageSize) + 1;
      const endNum = Math.min((pageNum * pageSize) + pageSize, totalItems);

      message = (
        <FormattedMessage
          {...listTypeConfig.messages.resultCount}
          values={{
            totalItems,
            startNum,
            endNum,
          }}
        />
      );
    }
  }

  if (pageSize === null) {
    pageSize = searchDescriptor.searchQuery.size;
  }

  const editLink = renderEditLink(searchDescriptor, onEditSearchLinkClick);

  const content = (
    <div>
      {message}
      {(message && editLink) ? ' | ' : ''}
      {editLink}
    </div>
  );

  const pageSizeChooser = (
    <PageSizeChooser
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
    />
  );

  return (
    <div className={styles.normal}>
      {content}
      {pageSizeChooser}
    </div>
  );
}

SearchResultSummary.propTypes = propTypes;
SearchResultSummary.defaultProps = defaultProps;
