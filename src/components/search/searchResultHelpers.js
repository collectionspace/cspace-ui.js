import Immutable from 'immutable';
import get from 'lodash/get';

// todo: where should this live?

/**
 * Get the column configuration from the main config. This uses the search descriptor in order
 * to read the recordType or subresource which we're trying to display columnar data for. This
 * is derived from the columns.js files for each procedure.
 *
 * @param {object} config           The cspace config
 * @param {object} searchDescriptor The search descriptor for the current search
 * @param {string} columnSetName    The column set, e.g. default, narrow, etc
 * @returns The configuration for the column set
 */
export function getColumnConfig(config, searchDescriptor, columnSetName) {
  const recordType = searchDescriptor.get('recordType');
  const subresource = searchDescriptor.get('subresource');

  const columnConfigurer = subresource
    ? config.subresources[subresource]
    : config.recordTypes[recordType];

  let columnConfig = get(columnConfigurer, ['columns', columnSetName]);

  if (!columnConfig && columnSetName !== 'default') {
    // Fall back to the default column set if the named one doesn't exist.

    columnConfig = get(columnConfigurer, ['columns', 'default']);
  }

  if (!columnConfig) {
    columnConfig = [];
  }

  return columnConfig;
}

/**
 * Extract the search result list items from a given search result.
 *
 * @param {*} config       The cspace config
 * @param {*} listType     The listType, e.g. abstract-common-list
 * @param {*} searchResult The response object from the search
 * @returns An Immutable.List containing the items for a search
 */
export function readListItems(config, listType, searchResult) {
  if (!searchResult) {
    return {
      list: null,
      items: null,
    };
  }

  const listTypeConfig = config.listTypes[listType];
  const { listNodeName, itemNodeName } = listTypeConfig;

  const list = searchResult.get(listNodeName) || Immutable.Map();
  let items = list.get(itemNodeName);
  if (!items) {
    items = Immutable.List();
  }

  if (!Immutable.List.isList(items)) {
    // If there's only one result, it won't be returned as a list.
    items = Immutable.List.of(items);
  }

  return {
    list,
    items,
  };
}

/**
 * Matches a sortBy field path that indexes into a repeating field, e.g. a subfield of a repeating
 * group (".../titleGroupList/0/title") or an element of a repeating scalar (".../owners/0").
 */
const complexFieldPattern = /\/\d+(\/|$)/;

/**
 * Determines if a column is sortable for a given search. A column is sortable if sortBy is truthy,
 * and the search is not constrained by a related record, or if it is, the field to sort by is not
 * complex. This is here to deal with CSPACE-5366 (searches with related record constraints are
 * done using CMIS, which can't see into complex fields). If that bug is ever fixed, then it will
 * suffice just to check sortBy.
 *
 * @param {object} column           A column configuration, expected to have a sortBy property
 * @param {object} searchDescriptor The search descriptor for the current search
 * @returns {boolean} true if the column may be sorted for this search
 */
export function isSortable(column, searchDescriptor) {
  const { sortBy } = column;

  return !!(sortBy
    && (!searchDescriptor.getIn(['searchQuery', 'rel']) || !complexFieldPattern.test(sortBy)));
}
