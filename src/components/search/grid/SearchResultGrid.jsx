import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import { readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import styles from '../../../../styles/cspace-ui/SearchGrid.css';
import { getListTypeFromResult } from '../../../helpers/searchHelpers';
import BlobImage from '../../media/BlobImage';
import SearchResultCheckbox from '../SearchResultCheckbox';
import { formatRefName } from '../../../helpers/formatHelpers';

const GRID_COLUMN_SET = 'grid';

const cardPropTypes = {
  result: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  listType: PropTypes.string,
  titleFields: PropTypes.array,
  subtitleFields: PropTypes.array,
  searchDescriptor: PropTypes.object,
};

export function SearchResultCard({
  result, index, titleFields, subtitleFields, searchDescriptor, listType,
}) {
  const config = useConfig();

  const csid = result.get('csid');
  const blobCsid = result.get('blobCsid');
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const selected = selectedItems ? selectedItems.has(csid) : false;

  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
  let location;
  let state;
  if (getItemLocationPath) {
    location = getItemLocationPath(result, { config, searchDescriptor });
    state = {
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: SEARCH_RESULT_PAGE_SEARCH_NAME,
    };
  }

  const blob = <BlobImage csid={blobCsid} derivative="Medium" />;
  return (
    <div className={styles.card}>
      {blob}
      <div>
        <div className={styles.summary}>
          <SearchResultCheckbox
            index={index}
            listType={listType}
            searchDescriptor={searchDescriptor}
            selected={selected}
          />
          <div className={styles.info}>
            <h2>
              {titleFields.map((field) => field.formatValue(result.get(field.dataKey)))
                .filter((resultData) => !!resultData)
                .join(': ')}
            </h2>
            <p>
              {result.get('title') || `${formatRefName(result.get('objectNameControlled'))}, ${result.get('objectName')}`}
            </p>
            <p>
              {`${formatRefName(result.get('agent'))} (${result.get('agentRole')})`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchResultCard.propTypes = cardPropTypes;

const getGridConfig = (config, searchDescriptor) => {
  const recordType = searchDescriptor.get('recordType');
  const subresource = searchDescriptor.get('subresource');

  const configurer = subresource
    ? config.subresources[subresource]
    : config.recordTypes[recordType];

  return get(configurer, ['grid']);
};

function SearchResultGrid({ searchDescriptor, intl }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();

  const listType = getListTypeFromResult(config, results);
  const { items } = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  function createFieldConfig(fieldConfig) {
    return Object.keys(fieldConfig)
      .filter((name) => !fieldConfig[name].disabled)
      .sort((nameA, nameB) => {
        const orderA = fieldConfig[nameA].order;
        const orderB = fieldConfig[nameB].order;
        return orderA - orderB;
      }).map((name) => {
        const field = fieldConfig[name];
        return {
          dataKey: field.dataKey || name,
          formatValue: (data) => {
            if (field.formatValue) {
              const formatterContext = {
                intl,
                config,
                data,
              };

              return field.formatValue(data, formatterContext);
            }
            return data;
          },
        };
      });
  }

  // read headers
  const cardConfig = getGridConfig(config, searchDescriptor, GRID_COLUMN_SET);
  const titleConfig = cardConfig.title.fields;
  const titleFields = createFieldConfig(titleConfig);
  const subtitleConfig = cardConfig.subtitle.fields;
  const subtitleFields = createFieldConfig(subtitleConfig);

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <SearchResultCard
          key={item.get('csid')}
          index={index}
          result={item}
          listType={listType}
          titleFields={titleFields}
          subtitleFields={subtitleFields}
          searchDescriptor={searchDescriptor}
        />
      ))}
    </div>
  );
}

SearchResultGrid.propTypes = {
  searchDescriptor: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(SearchResultGrid);
