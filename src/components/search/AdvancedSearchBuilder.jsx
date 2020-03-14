import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import { OP_AND, OP_OR, OP_GROUP } from '../../constants/searchOperators';
import GroupConditionInputContainer from '../../containers/search/input/GroupConditionInputContainer';
import BooleanConditionInput from './input/BooleanConditionInput';
import FieldConditionInput from './input/FieldConditionInput';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  hasChildGroups: PropTypes.bool,
  inline: PropTypes.bool,
  preferredBooleanOp: PropTypes.string,
  preferredCondition: PropTypes.instanceOf(Immutable.Map),
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

export const getSearchConditionInputComponent = (condition) => {
  const operator = condition.get('op');

  if (operator === OP_AND || operator === OP_OR) {
    return BooleanConditionInput;
  }

  if (operator === OP_GROUP) {
    return GroupConditionInputContainer;
  }

  return FieldConditionInput;
};

export default class AdvancedSearchBuilder extends Component {
  constructor() {
    super();

    this.handleConditionCommit = this.handleConditionCommit.bind(this);
  }

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
      preferredCondition,
      recordType,
      onConditionCommit,
    } = this.props;

    if (recordType && onConditionCommit) {
      let normalizedCondition;

      if (condition) {
        normalizedCondition = ensureRootBooleanOp(condition, preferredBooleanOp);
      } else {
        let initialCondition = preferredCondition;

        if (!initialCondition) {
          initialCondition = Immutable.fromJS(
            get(config, ['recordTypes', recordType, 'advancedSearch']),
          );
        }

        normalizedCondition = ensureRootBooleanOp(initialCondition, preferredBooleanOp);

        if (normalizedCondition.get('op') !== preferredBooleanOp) {
          normalizedCondition = normalizedCondition.set('op', preferredBooleanOp);
        }
      }

      if (normalizedCondition !== condition) {
        console.log('normalized:');
        console.log(normalizedCondition.toJS());
        onConditionCommit(normalizedCondition);
      }
    }
  }

  handleConditionCommit(name, condition) {
    const {
      onConditionCommit,
    } = this.props;

    if (onConditionCommit) {
      onConditionCommit(condition);
    }
  }

  render() {
    const {
      condition,
      config,
      hasChildGroups,
      inline,
      readOnly,
      recordType,
    } = this.props;

    if (!condition) {
      return null;
    }

    const SearchConditionInputComponent = getSearchConditionInputComponent(condition);

    const searchConditionInput = (
      <SearchConditionInputComponent
        condition={condition}
        config={config}
        hasChildGroups={hasChildGroups}
        inline={inline}
        name="advancedSearch"
        readOnly={readOnly}
        recordType={recordType}
        showInlineParens={false}
        showRemoveButton={false}
        getSearchConditionInputComponent={getSearchConditionInputComponent}
        onCommit={this.handleConditionCommit}
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
