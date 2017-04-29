import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import CheckboxInput from 'cspace-input/lib/components/CheckboxInput';
import styles from '../../../styles/cspace-ui/SelectBar.css';
import buttonBarStyles from '../../../styles/cspace-ui/ButtonBar.css';

const messages = defineMessages({
  selected: {
    id: 'selectBar.selected',
    description: 'Label showing the number of selected items.',
    defaultMessage: `{selectedItemCount, plural,
      =0 {0 selected}
      other {# selected}
    }`,
  },
});

const isPageSelected = (items, selectedItems) => {
  const itemCount = items.size;
  const selectedItemCount = selectedItems ? selectedItems.size : 0;

  if (itemCount === 0 || selectedItemCount === 0) {
    return false;
  }

  if (itemCount === 1) {
    // Only one item on the page. Return its selected state.

    return selectedItems.has(items.first().get('csid'));
  }

  const firstItem = items.first();
  const remainingItems = items.shift();

  const basis = selectedItems.has(firstItem.get('csid'));

  if (remainingItems.find(item => (selectedItems.has(item.get('csid')) !== basis))) {
    return null;
  }

  return basis;
};

const propTypes = {
  config: PropTypes.object,
  buttons: PropTypes.arrayOf(PropTypes.node),
  listType: PropTypes.string,
  searchDescriptor: PropTypes.object,
  searchName: PropTypes.string,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  setAllItemsSelected: PropTypes.func,
  showCheckboxFilter: PropTypes.func,
};

export default class SelectBar extends Component {
  constructor() {
    super();

    this.handleCheckboxCommit = this.handleCheckboxCommit.bind(this);
  }

  handleCheckboxCommit(path, value) {
    const {
      config,
      listType,
      searchName,
      searchDescriptor,
      setAllItemsSelected,
      showCheckboxFilter,
    } = this.props;

    if (setAllItemsSelected) {
      setAllItemsSelected(
        config, searchName, searchDescriptor, listType, value, showCheckboxFilter
      );
    }
  }

  render() {
    const {
      config,
      listType,
      searchResult,
      selectedItems,
      buttons,
      showCheckboxFilter,
    } = this.props;

    if (!searchResult) {
      return null;
    }

    const listTypeConfig = config.listTypes[listType];
    const { listNodeName, itemNodeName } = listTypeConfig;

    let items = searchResult.getIn([listNodeName, itemNodeName]);

    if (!items) {
      return null;
    }

    if (!Immutable.List.isList(items)) {
      items = Immutable.List.of(items);
    }

    if (showCheckboxFilter) {
      items = items.filter(showCheckboxFilter);
    }

    let buttonBar = null;

    if (buttons && buttons.length > 0) {
      buttonBar = (
        <div className={buttonBarStyles.common}>
          {buttons}
        </div>
      );
    }

    const selectedItemCount = selectedItems ? selectedItems.size : 0;

    return (
      <div className={styles.common}>
        <CheckboxInput
          readOnly={items.size === 0}
          tristate
          value={isPageSelected(items, selectedItems)}
          onCommit={this.handleCheckboxCommit}
        />
        <FormattedMessage {...messages.selected} values={{ selectedItemCount }} />
        {buttonBar}
      </div>
    );
  }
}

SelectBar.propTypes = propTypes;
