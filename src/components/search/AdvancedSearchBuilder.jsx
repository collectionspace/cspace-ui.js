import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchConditionInput from './input/SearchConditionInput';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';

const messages = defineMessages({
  title: {
    id: 'advancedSearchBuilder.title',
    defaultMessage: 'Advanced Search',
  },
});

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.object,
  recordType: PropTypes.string,
  onConditionCommit: PropTypes.func,
};

const childContextTypes = {
  recordType: PropTypes.string,
};

export default class AdvancedSearchBuilder extends Component {
  getChildContext() {
    const {
      recordType,
    } = this.props;

    return {
      recordType,
    };
  }

  componentDidMount() {
    this.normalizeCondition();
  }

  componentDidUpdate() {
    this.normalizeCondition();
  }

  normalizeCondition() {
    const {
      condition,
      config,
      recordType,
      onConditionCommit,
    } = this.props;

    if (!condition && onConditionCommit) {
      const defaultCondition = get(config, ['recordTypes', recordType, 'advancedSearch']);

      if (defaultCondition) {
        onConditionCommit(Immutable.fromJS(defaultCondition));
      }
    }
  }

  render() {
    const {
      condition,
      config,
      recordType,
      onConditionCommit,
    } = this.props;

    if (!condition) {
      return null;
    }

    const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields']);

    const panelHeader = (
      <h3><FormattedMessage {...messages.title} /></h3>
    );

    return (
      <ConnectedPanel
        collapsible
        header={panelHeader}
        name="advancedSearch"
        recordType={recordType}
      >
        <SearchConditionInput
          condition={condition}
          fields={fieldDescriptor}
          onCommit={onConditionCommit}
        />
      </ConnectedPanel>
    );
  }
}

AdvancedSearchBuilder.propTypes = propTypes;
AdvancedSearchBuilder.childContextTypes = childContextTypes;
