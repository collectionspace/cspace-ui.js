import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import Immutable from 'immutable';
import get from 'lodash/get';
import { isAuthority } from '../../helpers/configHelpers';
import styles from '../../../styles/cspace-ui/RecordBrowserNavBar.css';
import itemStyles from '../../../styles/cspace-ui/RecordBrowserNavItem.css';

const {
  RecordTypeInput,
} = inputComponents;

const messages = defineMessages({
  new: {
    id: 'recordBrowserNavBar.new',
    defaultMessage: 'New Record',
  },
  primary: {
    id: 'recordBrowserNavBar.primary',
    defaultMessage: 'Primary Record',
  },
  related: {
    id: 'recordBrowserNavBar.related',
    defaultMessage: '+ Related',
  },
  moreRelated: {
    id: 'recordBrowserNavBar.moreRelated',
    defaultMessage: '+ Related',
  },
});

const filterRecordTypes = (recordTypes, relatedRecordBrowsers) => {
  const filtered = {};
  const existingBrowsers = relatedRecordBrowsers.toOrderedSet();

  Object.keys(recordTypes).forEach((recordTypeName) => {
    const recordType = recordTypes[recordTypeName];
    const serviceType = get(recordType, ['serviceConfig', 'serviceType']);

    if (
      (serviceType === 'procedure' || serviceType === 'object') &&
      !existingBrowsers.includes(recordTypeName)
    ) {
      filtered[recordTypeName] = recordType;
    }
  });

  return filtered;
};

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  intl: intlShape,
  items: PropTypes.instanceOf(Immutable.List),
  setItems: PropTypes.func,
  onSelect: PropTypes.func,
};

const defaultProps = {
  items: Immutable.List(),
};

class RecordBrowserNavBar extends Component {
  constructor() {
    super();

    this.formatRecordTypeLabel = this.formatRecordTypeLabel.bind(this);
    this.handleItemButtonClick = this.handleItemButtonClick.bind(this);
    this.handleItemCloseButtonClick = this.handleItemCloseButtonClick.bind(this);
    this.handleRecordTypeDropdownCommit = this.handleRecordTypeDropdownCommit.bind(this);
  }

  componentDidMount() {
    this.initItems();
  }

  componentDidUpdate() {
    this.initItems();
  }

  initItems() {
    const {
      recordType,
      relatedRecordType,
      items,
      setItems,
    } = this.props;

    if (setItems && relatedRecordType && !items.includes(relatedRecordType)) {
      // We entered a related record page via URL, but there isn't currently a tab open for that
      // record type. Open the tab.

      setItems(recordType, items.push(relatedRecordType));
    }
  }

  formatRecordTypeLabel(name, config) {
    const {
      intl,
    } = this.props;

    return (intl.formatMessage(config.messages.record.collectionName) || name);
  }

  handleItemButtonClick(event) {
    const {
      onSelect,
    } = this.props;

    if (onSelect) {
      const {
        recordtype: relatedRecordType,
      } = event.target.dataset;

      onSelect(relatedRecordType);
    }
  }

  handleItemCloseButtonClick(event) {
    const {
      recordType,
      relatedRecordType,
      items,
      setItems,
      onSelect,
    } = this.props;

    const {
      recordtype: closedType,
    } = event.target.dataset;

    const itemSet = items.toOrderedSet();
    const updatedItems = itemSet.delete(closedType).toList();

    if (setItems) {
      setItems(recordType, updatedItems);
    }

    if (onSelect && (closedType === relatedRecordType)) {
      let index = itemSet.toList().findKey(value => value === closedType);

      if (index > updatedItems.size - 1) {
        index = updatedItems.size - 1;
      }

      const newType = updatedItems.get(index);

      onSelect(newType);
    }
  }

  handleRecordTypeDropdownCommit(path, value) {
    const {
      recordType,
      items,
      setItems,
      onSelect,
    } = this.props;

    if (setItems) {
      const updatedItems = items.toOrderedSet().add(value).toList();

      setItems(recordType, updatedItems);
    }

    if (onSelect) {
      onSelect(value);
    }
  }

  render() {
    const {
      config,
      csid,
      intl,
      items,
      recordType,
      relatedRecordType,
    } = this.props;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const showRelatedItems = csid && !isAuthority(recordTypeConfig);

    const primaryItem = (
      <li className={relatedRecordType ? itemStyles.normal : itemStyles.active}>
        <button
          disabled={!showRelatedItems || !relatedRecordType}
          onClick={this.handleItemButtonClick}
        >
          {intl.formatMessage(csid ? messages.primary : messages.new)}
        </button>
      </li>
    );

    let relatedItems;

    if (showRelatedItems) {
      relatedItems = Immutable.OrderedSet(items).map((itemRecordType) => {
        const itemRecordTypeConfig = get(config, ['recordTypes', itemRecordType]);
        const label = this.formatRecordTypeLabel(itemRecordType, itemRecordTypeConfig);

        const className = (itemRecordType === relatedRecordType)
          ? itemStyles.active
          : itemStyles.normal;

        return (
          <li className={className} key={itemRecordType}>
            <button
              data-recordtype={itemRecordType}
              disabled={itemRecordType === relatedRecordType}
              onClick={this.handleItemButtonClick}
            >
              {label}
            </button>
            <button
              data-recordtype={itemRecordType}
              onClick={this.handleItemCloseButtonClick}
            />
          </li>
        );
      });
    }

    let relatedRecordTypeSelector;

    if (showRelatedItems) {
      const filteredRecordTypes = filterRecordTypes(config.recordTypes, items);

      if (Object.keys(filteredRecordTypes).length > 0) {
        const placeholder = items.size > 0
          ? intl.formatMessage(messages.moreRelated)
          : intl.formatMessage(messages.related);

        relatedRecordTypeSelector = (
          <li className={itemStyles.selector}>
            <RecordTypeInput
              indentItems={false}
              placeholder={placeholder}
              recordTypes={filteredRecordTypes}
              value="0"
              formatRecordTypeLabel={this.formatRecordTypeLabel}
              onCommit={this.handleRecordTypeDropdownCommit}
            />
          </li>
        );
      }
    }

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    return (
      <nav className={styles[serviceType]}>
        <ul>
          {primaryItem}
          {relatedItems}
          {relatedRecordTypeSelector}
        </ul>
      </nav>
    );
  }
}

RecordBrowserNavBar.propTypes = propTypes;
RecordBrowserNavBar.defaultProps = defaultProps;

export default injectIntl(RecordBrowserNavBar);
