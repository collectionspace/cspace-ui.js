import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import Immutable from 'immutable';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import { isAuthority, isUtility } from '../../helpers/configHelpers';
import { canList } from '../../helpers/permissionHelpers';
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
  close: {
    id: 'recordBrowserNavBar.close',
    defaultMessage: 'close',
  },
});

const filterRecordTypes = (recordTypes, relatedRecordBrowsers, perms) => {
  const existingBrowsers = relatedRecordBrowsers.toOrderedSet();

  return pickBy(recordTypes, (recordTypeConfig, name) => {
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

    return (
      (serviceType === 'procedure' || serviceType === 'object')
      && !existingBrowsers.includes(name)
      && canList(name, perms)
    );
  });
};

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  recordType: PropTypes.string,
  relatedRecordType: PropTypes.string,
  intl: intlShape,
  items: PropTypes.instanceOf(Immutable.List),
  perms: PropTypes.instanceOf(Immutable.Map),
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
      let index = itemSet.toList().findKey((value) => value === closedType);

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

  render() {
    const {
      config,
      csid,
      intl,
      items,
      perms,
      recordType,
      relatedRecordType,
    } = this.props;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    const showRelatedItems = csid && !isAuthority(recordTypeConfig) && !isUtility(recordTypeConfig);

    const primaryItem = (
      <li className={relatedRecordType ? itemStyles.normal : itemStyles.active}>
        <button
          disabled={!showRelatedItems || !relatedRecordType}
          type="button"
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
              type="button"
              onClick={this.handleItemButtonClick}
            >
              {label}
            </button>
            <button
              aria-label={intl.formatMessage(messages.close)}
              data-recordtype={itemRecordType}
              type="button"
              onClick={this.handleItemCloseButtonClick}
            />
          </li>
        );
      });
    }

    let relatedRecordTypeSelector;

    if (showRelatedItems) {
      const filteredRecordTypes = filterRecordTypes(config.recordTypes, items, perms);

      if (Object.keys(filteredRecordTypes).length > 0) {
        const placeholder = items.size > 0
          ? intl.formatMessage(messages.moreRelated)
          : intl.formatMessage(messages.related);

        relatedRecordTypeSelector = (
          <li className={itemStyles.selector}>
            <RecordTypeInput
              filtering={false}
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
