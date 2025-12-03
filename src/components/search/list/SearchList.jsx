import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import DetailItem from './DetailItem';
import { readListItems } from '../searchResultHelpers';
import { getSearchResult, getSearchSelectedItems } from '../../../reducers';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';
import { useConfig } from '../../config/ConfigProvider';

import styles from '../../../../styles/cspace-ui/SearchList.css';
import { getListTypeFromResult } from '../../../helpers/searchHelpers';

const propTypes = {
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
};

const getDetailConfig = (config, searchDescriptor) => {
  const recordType = searchDescriptor.get('recordType');
  const subresource = searchDescriptor.get('subresource');

  const configurer = subresource
    ? config.subresources[subresource]
    : config.recordTypes[recordType];

  return get(configurer, ['detailList']);
};

export default function SearchDetailList({ searchDescriptor }) {
  const results = useSelector((state) => getSearchResult(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME,
    searchDescriptor));
  const selectedItems = useSelector((state) => getSearchSelectedItems(state,
    SEARCH_RESULT_PAGE_SEARCH_NAME));
  const config = useConfig();

  const listType = getListTypeFromResult(config, results);
  const { items } = readListItems(config, listType, results);
  if (!items) {
    return null;
  }

  // read headers
  const detailConfig = getDetailConfig(config, searchDescriptor);
  return (
    <div className={styles.detail}>
      {items.map((item, index) => (
        <DetailItem
          item={item}
          key={item.get('csid')}
          index={index}
          detailConfig={detailConfig}
          searchDescriptor={searchDescriptor}
          listType={listType}
          selectedItems={selectedItems}
        />
      ))}
    </div>
  );
}

SearchDetailList.propTypes = propTypes;
