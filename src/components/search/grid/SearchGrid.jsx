import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import styles from './SearchGrid.css';
import deactivate from '../../../../images/deactivate.svg';
import { readListItems, getColumnConfig } from '../searchResultHelpers';
import { getSearchResult } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';

const GRID_COLUMN_SET = 'grid';

const cardPropTypes = {
  result: PropTypes.instanceOf(Immutable.Map),
  cardConfig: PropTypes.shape({
    title: PropTypes.shape({
      fields: PropTypes.array,
    }),
    subtitle: PropTypes.shape({
      fields: PropTypes.array,
    }),
  }),
};

export function SearchResultCard({ result, cardConfig }) {
  const titleFields = cardConfig.title.fields;
  const subtitleFields = cardConfig.subtitle.fields;

  // todo: read fields from record config
  // todo: loading image
  return (
    <div>
      <img src={deactivate} className={styles.card} />
      <div>
        <div className={styles.summary}>
          <input type="checkbox" />
          <span>
            {titleFields.map((field) => result.get(field))
              .filter((resultData) => !!resultData)
              .join(': ')}
          </span>
        </div>
        <span>
          {subtitleFields.map((field) => result.get(field))
            .filter((resultData) => !!resultData)
            .join(': ')}
        </span>
      </div>
    </div>
  );
}

SearchResultCard.propTypes = cardPropTypes;

function SearchResultGrid({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const config = useConfig();

  if (!results) {
    return null;
  }

  // Note: The items returned is an Immutable.Map, so we need to use get
  // in order to retrieve the data
  // todo: read into the search results based on the list type
  // todo: why do we need to do !results AND !items?
  const items = readListItems(config, 'common', results);
  if (!items) {
    return null;
  }

  // read headers
  const cardConfig = getColumnConfig(config, searchDescriptor, GRID_COLUMN_SET);

  // todo: sidebar is open prop to control grid size?
  // or could try flexbox

  return (
    <div className={styles.grid}>
      {items.map((item) => <SearchResultCard key={item.csid} result={item} cardConfig={cardConfig} />)}
    </div>
  );
}

export default injectIntl(SearchResultCard);
