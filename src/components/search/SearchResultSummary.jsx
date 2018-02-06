import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import PageSizeChooser from './PageSizeChooser';
import { ERR_API, ERR_NOT_ALLOWED } from '../../constants/errorCodes';
import styles from '../../../styles/cspace-ui/SearchResultSummary.css';

const messages = defineMessages({
  error: {
    id: 'searchResultSummary.error',
    defaultMessage: 'Error: {code}',
  },
  [ERR_NOT_ALLOWED]: {
    id: 'searchResultSummary.ERR_NOT_ALLOWED',
    defaultMessage: 'You\'re not allowed to perform this search.',
  },
  editSearch: {
    id: 'searchResultSummary.editSearch',
    defaultMessage: 'Revise search',
  },
});

const propTypes = {
  config: PropTypes.object,
  listType: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchError: PropTypes.instanceOf(Immutable.Map),
  searchResult: PropTypes.instanceOf(Immutable.Map),
  renderEditLink: PropTypes.func,
  onEditSearchLinkClick: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

const defaultProps = {
  renderEditLink: (searchDescriptor, onEditSearchLinkClick) => {
    const recordType = searchDescriptor.get('recordType');
    const vocabulary = searchDescriptor.get('vocabulary');
    const subresource = searchDescriptor.get('subresource');
    const searchQuery = searchDescriptor.get('searchQuery');

    if (subresource || searchQuery.get('rel')) {
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
    const error = searchError.toJS();

    let { code } = error;

    if (code === ERR_API) {
      const status = get(error, ['error', 'response', 'status']);

      if (status === 401) {
        // Convert 401 to ERR_NOT_ALLOWED.
        code = ERR_NOT_ALLOWED;
      }
    }

    const message = messages[code] || messages.error;

    return (
      <div className={styles.error}>
        <FormattedMessage {...message} values={error} />
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
    pageSize = searchDescriptor.getIn(['searchQuery', 'size']);
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
