import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchConditionInput from './input/SearchConditionInput';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';

import {
  OP_AND,
  OP_OR,
  OP_RANGE,
  OP_GTE,
} from '../../constants/searchOperators';

const messages = defineMessages({
  title: {
    id: 'advancedSearchBuilder.title',
    defaultMessage: 'Advanced Search',
  },
});

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.object,
  inline: PropTypes.bool,
  preferredBooleanOp: PropTypes.string,
  readOnly: PropTypes.bool,
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
      preferredBooleanOp,
      recordType,
      onConditionCommit,
    } = this.props;

    // FIXME: Uncomment this once conditions may be added by the end user.

    // if (!condition && onConditionCommit) {
    //   const defaultCondition = get(config, ['recordTypes', recordType, 'advancedSearch']);
    //
    //   if (defaultCondition) {
    //     onConditionCommit(Immutable.fromJS(defaultCondition));
    //   }
    // }

    // FIXME: There will be no need for this once conditions may be added by the end user.
    // For now do a quick and dirty merge of the (possibly normalized) condition into the
    // default, so that fields aren't unrecoverable after normalization.

    if (onConditionCommit) {
      const defaultCondition = Immutable.fromJS(
        get(config, ['recordTypes', recordType, 'advancedSearch']));

      const op = condition && condition.get('op');

      if (preferredBooleanOp && (op === OP_AND || op === OP_OR) && (op !== preferredBooleanOp)) {
        onConditionCommit(condition.set('op', preferredBooleanOp));
      } else if (defaultCondition && condition) {
        if (
          op !== defaultCondition.get('op') ||
          !Immutable.List.isList(condition.get('value')) ||
          condition.get('value').size !== defaultCondition.get('value').size
        ) {
          let mergedCondition = defaultCondition;
          let clauses;

          if (op === OP_AND || op === OP_OR) {
            mergedCondition = mergedCondition.set('op', op);

            clauses = condition.get('value');
          } else {
            if (preferredBooleanOp) {
              mergedCondition = mergedCondition.set('op', preferredBooleanOp);
            }

            clauses = Immutable.List([condition]);
          }

          clauses.forEach((clause) => {
            const targetClauses = mergedCondition.get('value');

            const index = targetClauses.findKey(targetClause =>
              targetClause.get('path') === clause.get('path')
            );

            if (typeof index !== 'undefined') {
              const targetClause = targetClauses.get(index);

              let value = clause.get('value');

              if (targetClause.get('op') === OP_RANGE && !Immutable.List.isList(value)) {
                value = (clause.get('op') === OP_GTE)
                  ? Immutable.List([value])
                  : Immutable.List([undefined, value]);
              }

              mergedCondition = mergedCondition.setIn(['value', index, 'value'], value);
            }
          });

          if (!mergedCondition.equals(condition)) {
            onConditionCommit(mergedCondition);
          }
        }
      } else {
        onConditionCommit(
          preferredBooleanOp
            ? defaultCondition.set('op', preferredBooleanOp)
            : defaultCondition
        );
      }
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
AdvancedSearchBuilder.childContextTypes = childContextTypes;
