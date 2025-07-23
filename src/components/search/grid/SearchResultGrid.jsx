import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { readListItems, getColumnConfig } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';
import deactivate from '../../../../images/deactivate.svg';
import { CheckboxInput } from '../../../helpers/configContextInputs';
import styles from '../../../../styles/cspace-ui/SearchGrid.css';
import { setResultItemSelected } from '../../../actions/search';

const GRID_COLUMN_SET = 'grid';

const cardPropTypes = {
  result: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  cardConfig: PropTypes.shape({
    title: PropTypes.shape({
      fields: PropTypes.array,
    }),
    subtitle: PropTypes.shape({
      fields: PropTypes.array,
    }),
  }),
  searchDescriptor: PropTypes.object,
};

export function SearchResultCard({
  result, index, cardConfig, searchDescriptor,
}) {
  const config = useConfig();
  const dispatch = useDispatch();
  const titleFields = cardConfig.title.fields;
  const subtitleFields = cardConfig.subtitle.fields;

  const csid = result.get('csid');
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const selected = selectedItems ? selectedItems.has(csid) : false;

  // todo: read fields from record config
  // todo: loading image
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={deactivate} className={styles.card} />
      <div>
        <div className={styles.summary}>
          <CheckboxInput
            embedded
            className={styles.detailCheckbox}
            name={`${index}`}
            value={selected}
            onCommit={(path, value) => dispatch(setResultItemSelected(config,
              SEARCH_RESULT_PAGE_SEARCH_NAME,
              searchDescriptor,
              'common',
              parseInt(path[0], 10),
              value))}
            onClick={(event) => event.stopPropagation()}
          />
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

const propTypes = {
  searchDescriptor: PropTypes.object,
};

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
      {items.map((item, index) => (
        <SearchResultCard
          key={item.csid}
          index={index}
          result={item}
          cardConfig={cardConfig}
          searchDescriptor={searchDescriptor}
        />
      ))}
    </div>
  );
}

SearchResultGrid.propTypes = propTypes;

export default injectIntl(SearchResultGrid);
