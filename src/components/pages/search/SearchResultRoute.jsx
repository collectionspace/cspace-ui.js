import React from 'react';
import { useParams } from 'react-router-dom';
import get from 'lodash/get';
import SearchResults from './SearchResults';
import SearchResultPageContainer from '../../../containers/pages/SearchResultPageContainer';
import { useConfig } from '../../config/ConfigProvider';

/**
 * A function which chooses either the new search result page (SearchResults) or
 * old search result page (SearchResultPageContainer) for rendering
 *
 * @param {*} props
 * @returns the component to render
 */
export default function SearchResultRoute(props) {
  const { recordType, subresource } = useParams();
  const config = useConfig();

  const isNewSearch = !subresource && get(config,
    ['recordTypes', recordType, 'serviceConfig', 'features', 'updatedSearch']);

  return isNewSearch
    ? <SearchResults {...props} isNewSearch />
    : <SearchResultPageContainer {...props} />;
}
