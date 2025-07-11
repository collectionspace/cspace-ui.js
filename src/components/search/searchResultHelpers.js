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
  // todo: read into the search results based on the list type
  const listTypeConfig = config.listTypes[listType];
  const { listNodeName, itemNodeName } = listTypeConfig;

  const list = searchResult.get(listNodeName);

  return list.get(itemNodeName);
}
