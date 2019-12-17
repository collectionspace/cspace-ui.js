import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { getRecordTypeNameByUri, getFirstColumnName } from '../../helpers/configHelpers';

const { ChooserInput } = inputComponents;

const itemLimit = 10;

const messages = defineMessages({
  value: {
    id: 'recordSearchInput.value',
    defaultMessage: `{count, plural,
      =0 {}
      one {}
      other {# records: }
    }{items}{remainingCount, plural,
      =0 {}
      other {, and # more}
    }`,
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  openSearchModal: PropTypes.func,
};

export default class RecordSearchInput extends Component {
  constructor(props) {
    super(props);

    this.formatValue = this.formatValue.bind(this);
    this.handleChooseButtonClick = this.handleChooseButtonClick.bind(this);
  }

  formatValue(value) {
    const {
      config,
    } = this.props;

    if (value && value.size > 0) {
      const descriptions = value.valueSeq().take(itemLimit).map((item) => {
        const recordType = getRecordTypeNameByUri(config, item.get('uri'));
        const firstColumnName = getFirstColumnName(config, recordType);

        return (item.get(firstColumnName) || item.get('csid')) || '?';
      }).toJS();

      return (
        <FormattedMessage
          {...messages.value}
          values={{
            items: descriptions.join(', '),
            count: value.size,
            remainingCount: Math.max(value.size - itemLimit, 0),
          }}
        />
      );
    }

    return value;
  }

  handleChooseButtonClick() {
    const {
      openSearchModal,
    } = this.props;

    if (openSearchModal) {
      openSearchModal();
    }
  }

  render() {
    return (
      <ChooserInput
        formatValue={this.formatValue}
        onChooseButtonClick={this.handleChooseButtonClick}
        {...this.props}
      />
    );
  }
}

RecordSearchInput.propTypes = propTypes;
