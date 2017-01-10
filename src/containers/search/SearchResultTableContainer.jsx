import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import SearchResultTable from '../../components/search/SearchResultTable';
import withConfig from '../../enhancers/withConfig';

import {
  isSearchPending,
  getSearchResult,
  getSearchError,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    config,
    searchDescriptor,
  } = ownProps;

  return {
    formatCellData: (column, data) =>
      (column.formatValue ? column.formatValue(data, { intl, config }) : data),
    formatColumnLabel: column =>
      intl.formatMessage(column.messages.label),
    isSearchPending: isSearchPending(state, searchDescriptor),
    searchResult: getSearchResult(state, searchDescriptor),
    searchError: getSearchError(state, searchDescriptor),
  };
};

export const ConnectedSearchResultTable = connect(
  mapStateToProps,
)(SearchResultTable);

export default injectIntl(withConfig(ConnectedSearchResultTable));
