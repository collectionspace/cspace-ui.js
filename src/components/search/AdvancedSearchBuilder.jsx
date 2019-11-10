import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchConditionInput from './input/SearchConditionInput';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import { OP_AND, OP_OR } from '../../constants/searchOperators';

const messages = defineMessages({
  title: {
    id: 'advancedSearchBuilder.title',
    defaultMessage: 'Advanced Search',
  },
});

const ensureRootBooleanOp = (condition, preferredBooleanOp) => {
  const op = condition && condition.get('op');

  if (op === OP_AND || op === OP_OR) {
    return condition;
  }

  return (
    Immutable.Map()
      .set('op', preferredBooleanOp)
      .set('value', condition ? Immutable.List.of(condition) : Immutable.List())
  );
};

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.object,
  inline: PropTypes.bool,
  preferredBooleanOp: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  onConditionCommit: PropTypes.func,
};

const defaultProps = {
  preferredBooleanOp: 'or',
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
      preferredBooleanOp,
      recordType,
      onConditionCommit,
    } = this.props;

    if (onConditionCommit) {
      let normalizedCondition;

      if (condition) {
        normalizedCondition = ensureRootBooleanOp(condition, preferredBooleanOp);
      } else {
        const defaultCondition = Immutable.fromJS(
          get(config, ['recordTypes', recordType, 'advancedSearch'])
        );

        normalizedCondition = ensureRootBooleanOp(defaultCondition, preferredBooleanOp);

        if (normalizedCondition.get('op') !== preferredBooleanOp) {
          normalizedCondition = normalizedCondition.set('op', preferredBooleanOp);
        }
      }

      onConditionCommit(normalizedCondition);
    }
  }

  render() {
    const {
      condition,
      config,
      inline,
      readOnly,
      recordType,
      onConditionCommit,
    } = this.props;

    if (!condition) {
      return null;
    }

    const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields']);

    const searchConditionInput = (
      <SearchConditionInput
        condition={condition}
        fields={fieldDescriptor}
        inline={inline}
        readOnly={readOnly}
        onCommit={onConditionCommit}
      />
    );

    if (inline) {
      return searchConditionInput;
    }

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
        {searchConditionInput}
      </ConnectedPanel>
    );
  }
}

AdvancedSearchBuilder.propTypes = propTypes;
AdvancedSearchBuilder.defaultProps = defaultProps;
AdvancedSearchBuilder.childContextTypes = childContextTypes;
