import Immutable from 'immutable';

export default (data) => {
  // Sort items by the order field.

  const itemPath = ['document', 'ns2:abstract-common-list', 'list-item'];
  const items = data.getIn(itemPath);

  if (!items) {
    return data;
  }

  let normalizedItems;

  if (!Immutable.List.isList(items)) {
    normalizedItems = Immutable.List.of(items);
  } else {
    normalizedItems = items.sortBy(item => item.get('order'));
  }

  return data.setIn(itemPath, normalizedItems);
};
