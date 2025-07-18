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
  const { recordType } = useParams();
  const config = useConfig();

  // todo: this should use the feature flag. At the moment it's hard coded for collectionobjects
  // const isNewSearch = get(config, ['recordTypes', recordType, 'serviceConfig', 'useUpdatedSearch']);
  const isNewSearch = recordType === 'collectionobject';

  return isNewSearch
    ? <SearchResults {...props} />
    : <SearchResultPageContainer {...props} />;
}
