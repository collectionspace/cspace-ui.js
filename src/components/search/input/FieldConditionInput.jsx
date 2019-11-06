import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import SearchField from '../SearchField';
import RangeSearchField from '../RangeSearchField';
import OperatorInput from './OperatorInput';
import { configKey } from '../../../helpers/configHelpers';
import { OP_RANGE } from '../../../constants/searchOperators';

import {
  dataTypeSupportsMultipleValues,
  operatorSupportsMultipleValues,
} from '../../../helpers/searchHelpers';

import {
  AutocompleteInput,
  OptionPickerInput,
  TermPickerInput,
} from '../../../helpers/createConfigContext';

import styles from '../../../../styles/cspace-ui/FieldConditionInput.css';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  inline: PropTypes.bool,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
};

export default class FieldConditionInput extends Component {
  constructor() {
    super();

    this.handleOperatorCommit = this.handleOperatorCommit.bind(this);
    this.handleValueCommit = this.handleValueCommit.bind(this);
  }

  handleOperatorCommit(path, operator) {
    const {
      condition,
      onCommit,
    } = this.props;

    if (onCommit) {
      let nextCondition = condition.set('op', operator);

      if (!operatorSupportsMultipleValues(operator)) {
        // If the new operator doesn't support multiple values, but the old one did, and multiple
        // values were entered, prune all values except the first.

        const value = condition.get('value');

        if (Immutable.List.isList(value)) {
          nextCondition = nextCondition.set('value', value.first());
        }
      }

      onCommit(nextCondition);
    }
  }

  handleValueCommit(path, value) {
    const {
      condition,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(condition.set('value', value));
    }
  }

  render() {
    const {
      condition,
      inline,
      readOnly,
    } = this.props;

    const {
      config,
      recordType,
    } = this.context;

    const operator = condition.get('op');
    const pathSpec = condition.get('path');
    const value = condition.get('value');

    const path = ['document', ...pathSpec.split('/')];
    const name = path[path.length - 1];
    const parentPath = path.slice(0, path.length - 1);

    const fieldConfig = get(config, ['recordTypes', recordType, 'fields', ...path, configKey]);
    const dataType = get(fieldConfig, 'dataType');
    const messages = get(fieldConfig, 'messages');

    const viewType = get(fieldConfig, ['view', 'type']);

    const isControlled = (
      viewType === AutocompleteInput
      || viewType === OptionPickerInput
      || viewType === TermPickerInput
    );

    const label = messages
      ? <FormattedMessage {...(messages.fullName || messages.name)} />
      : name;

    const SearchFieldComponent = (operator === OP_RANGE) ? RangeSearchField : SearchField;
    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className}>
        <div>{label}</div>
        {' '}
        <OperatorInput
          compact={inline}
          dataType={dataType}
          isControlled={isControlled}
          readOnly={inline}
          value={operator}
          onCommit={this.handleOperatorCommit}
        />
        {' '}
        <div>
          <SearchFieldComponent
            inline={inline}
            parentPath={parentPath}
            name={name}
            readOnly={readOnly}
            repeating={
              operatorSupportsMultipleValues(operator)
              && dataTypeSupportsMultipleValues(dataType)
            }
            value={value}
            onCommit={this.handleValueCommit}
          />
        </div>
      </div>
    );
  }
}

FieldConditionInput.propTypes = propTypes;
FieldConditionInput.contextTypes = contextTypes;
