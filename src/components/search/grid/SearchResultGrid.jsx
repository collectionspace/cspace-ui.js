import React from 'react';
import { Link } from 'react-router-dom';
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
  titleFields: PropTypes.array,
  subtitleFields: PropTypes.array,
  searchDescriptor: PropTypes.object,
};

export function SearchResultCard({
  result, index, titleFields, subtitleFields, searchDescriptor, listType,
}) {
  const config = useConfig();
  const dispatch = useDispatch();

  const csid = result.get('csid');
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const selected = selectedItems ? selectedItems.has(csid) : false;

  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
  let location;
  if (getItemLocationPath) {
    location = getItemLocationPath(result, { config, searchDescriptor });
  }

  // todo: read fields from record config
  // todo: loading image
  return (
    <div style={{ paddingBottom: '10px' }}>
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
              listType,
              parseInt(path[0], 10),
              value))}
            onClick={(event) => event.stopPropagation()}
          />
          <Link to={location}>
            <span>
              {titleFields.map((field) => field.formatValue(result.get(field.dataKey)))
                .filter((resultData) => !!resultData)
                .join(': ')}
            </span>
          </Link>
        </div>
        <Link to={location}>
          <span>
            {subtitleFields.map((field) => field.formatValue(result.get(field.dataKey)))
              .filter((resultData) => !!resultData)
              .join(': ')}
          </span>
        </Link>
      </div>
    </div>
  );
}

SearchResultCard.propTypes = cardPropTypes;

const propTypes = {
  searchDescriptor: PropTypes.object,
  listType: PropTypes.string,
  intl: PropTypes.object,
};

function SearchResultGrid({ searchDescriptor, listType = 'search', intl }) {
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
  const items = readListItems(config, listType, results);
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
  const cardConfig = getColumnConfig(config, searchDescriptor, GRID_COLUMN_SET);
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

SearchResultGrid.propTypes = propTypes;

export default injectIntl(SearchResultGrid);
