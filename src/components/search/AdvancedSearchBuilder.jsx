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
import {
  SEARCH_TERMS_GROUP_LIMIT_BY,
  SEARCH_TERMS_GROUP_SEARCH_TERMS,
} from '../../constants/searchNames';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  hasChildGroups: PropTypes.bool,
  inline: PropTypes.bool,
  withoutPanel: PropTypes.bool,
  preferredBooleanOp: PropTypes.string,
  preferredCondition: PropTypes.instanceOf(Immutable.Map),
  preferredConditionNew: PropTypes.instanceOf(Immutable.Map),
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  searchTermsGroup: PropTypes.string,
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

  handleConditionCommit(name, condition) {
    const {
      onConditionCommit,
    } = this.props;

    if (onConditionCommit) {
      onConditionCommit(condition);
    }
  }

  normalizeCondition() {
    const {
      condition,
      config,
      preferredBooleanOp,
      preferredCondition,
      preferredConditionNew,
      recordType,
      onConditionCommit,
      searchTermsGroup,
    } = this.props;

    if (recordType && onConditionCommit) {
      let normalizedCondition;
      let initialCondition;

      if (condition) {
        normalizedCondition = ensureRootBooleanOp(condition, preferredBooleanOp);
      } else {
        const isNewSearchForm = searchTermsGroup === SEARCH_TERMS_GROUP_LIMIT_BY
          || searchTermsGroup === SEARCH_TERMS_GROUP_SEARCH_TERMS;

        const recordTypesWithDefaultFields = ['all', 'procedure', 'authority'];

        // use preferred condition when not using new search form
        if (!isNewSearchForm) {
          initialCondition = preferredCondition;
        }

        // use config condition when there is no preferred condition
        // and not using new search form or for new search terms group
        // when recordType is with default fields
        if (
          !initialCondition && (
            !isNewSearchForm
            || (searchTermsGroup === SEARCH_TERMS_GROUP_SEARCH_TERMS
              && recordTypesWithDefaultFields.includes(recordType))
          )
        ) {
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
        onConditionCommit(normalizedCondition);
      }
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
      withoutPanel,
      searchTermsGroup,
    } = this.props;

    if (!condition) {
      return null;
    }

    const isNewSearchForm = searchTermsGroup === SEARCH_TERMS_GROUP_LIMIT_BY
      || searchTermsGroup === SEARCH_TERMS_GROUP_SEARCH_TERMS;
    const SearchConditionInputComponent = getSearchConditionInputComponent(condition);

    const searchConditionInput = (
      <SearchConditionInputComponent
        condition={condition}
        config={config}
        hasChildGroups={hasChildGroups}
        inline={inline}
        name="advancedSearch"
        readOnly={readOnly}
        isNewSearchForm={isNewSearchForm}
        recordType={recordType}
        showInlineParens={false}
        showRemoveButton={false}
        getSearchConditionInputComponent={getSearchConditionInputComponent}
        onCommit={this.handleConditionCommit}
      />
    );

    if (inline || withoutPanel) {
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
