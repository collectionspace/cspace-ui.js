import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import FieldInput from './FieldInput';
import OperatorInput from './OperatorInput';
import RangeSearchField from '../RangeSearchField';
import SearchField from '../SearchField';
import RemoveConditionButton from '../RemoveConditionButton';
import { OP_RANGE, OP_NOT_RANGE } from '../../../constants/searchOperators';

import {
  configKey,
  getFieldDataType,
} from '../../../helpers/configHelpers';

import {
  AutocompleteInput,
  OptionPickerInput,
  TermPickerInput,
} from '../../../helpers/configContextInputs';

import {
  getOperatorsForDataType,
  dataTypeSupportsMultipleValues,
  operatorSupportsMultipleValues,
  operatorExpectsValue,
} from '../../../helpers/searchHelpers';

import styles from '../../../../styles/cspace-ui/FieldConditionInput.css';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  inline: PropTypes.bool,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  rootPath: PropTypes.string,
  onCommit: PropTypes.func,
  onRemove: PropTypes.func,
};

const isFieldControlled = (fieldDescriptor) => {
  const viewType = get(fieldDescriptor, [configKey, 'view', 'type']);

  return (
    viewType === AutocompleteInput
    || viewType === OptionPickerInput
    || viewType === TermPickerInput
  );
};

export default class FieldConditionInput extends Component {
  constructor() {
    super();

    this.handleFieldCommit = this.handleFieldCommit.bind(this);
    this.handleOperatorCommit = this.handleOperatorCommit.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleValueCommit = this.handleValueCommit.bind(this);
  }

  componentDidMount() {
    const {
      condition,
    } = this.props;

    const path = condition.get('path');

    if (path === null) {
      // The condition was just added, and the field needs to be selected. Focus it.

      if (this.domNode) {
        const input = this.domNode.querySelector('input[data-name="field"]');

        if (input) {
          input.focus();
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      condition,
    } = this.props;

    const {
      condition: prevCondition,
    } = prevProps;

    if (condition !== prevCondition) {
      const path = condition.get('path');

      if (path) {
        const ops = this.getOperators(path);

        if (!ops.includes(condition.get('op'))) {
          // The new field's operators don't include the current operator. Set the operator to the
          // first of the new field's supported operators.

          // FIXME: This doesn't work if componentDidUpdate in AdvancedSearchBuilder executes
          // normalizeCondition, and the condition is normalized. In that case, it will restore the
          // previous operator. This all needs to be reworked.

          this.setOperator(ops[0]);
        }
      }

      if (path !== null && prevCondition.get('path') === null) {
        // The field was just selected. Focus the operator.

        if (this.domNode) {
          const input = this.domNode.querySelector('input[data-name="searchOp"]');

          if (input) {
            input.focus();
          }
        }
      }
    }
  }

  getOperators(path) {
    const {
      config,
      recordType,
    } = this.props;

    const fieldDescriptor = get(
      config, ['recordTypes', recordType, 'fields', 'document', ...path.split('/')],
    );

    const dataType = getFieldDataType(fieldDescriptor);
    const isControlled = isFieldControlled(fieldDescriptor);

    return getOperatorsForDataType(dataType, isControlled);
  }

  setOperator(operator) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      let nextCondition = condition.set('op', operator);

      if (!operatorExpectsValue(operator)) {
        // If the new operator doesn't expect a value, remove any values that exist.

        nextCondition = nextCondition.delete('value');
      } else if (!operatorSupportsMultipleValues(operator)) {
        // If the new operator doesn't support multiple values, prune all values except the first.

        const value = condition.get('value');

        if (Immutable.List.isList(value)) {
          nextCondition = nextCondition.set('value', value.first());
        }
      }

      onCommit(name, nextCondition);
    }
  }

  handleFieldCommit(path, fieldPath) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      // Delete the current value, since it may not be valid for the new field.

      onCommit(name, condition.set('path', fieldPath).delete('value'));
    }
  }

  handleOperatorCommit(path, operator) {
    this.setOperator(operator);
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  handleRemoveButtonClick() {
    const {
      name,
      onRemove,
    } = this.props;

    if (onRemove) {
      onRemove(name);
    }
  }

  handleValueCommit(path, value) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(name, condition.set('value', value));
    }
  }

  renderFieldInput() {
    const {
      condition,
      config,
      inline,
      recordType,
      rootPath,
    } = this.props;

    const pathSpec = condition.get('path');

    if (!pathSpec) {
      if (inline) {
        return null;
      }

      return (
        <FieldInput
          config={config}
          inline={inline}
          name="field"
          placeholder="Field"
          recordType={recordType}
          rootPath={rootPath}
          onCommit={this.handleFieldCommit}
        />
      );
    }

    const path = ['document', ...pathSpec.split('/')];
    const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields', ...path]);

    return (
      <FieldInput
        config={config}
        inline={inline}
        readOnly
        recordType={recordType}
        rootPath={rootPath}
        value={pathSpec}
        valueDescriptor={fieldDescriptor}
        onCommit={this.handleFieldCommit}
      />
    );
  }

  renderOperatorInput() {
    const {
      condition,
      config,
      inline,
      readOnly,
      recordType,
    } = this.props;

    const pathSpec = condition.get('path');

    if (!pathSpec) {
      return (inline ? null : <div><span>...</span></div>);
    }

    const operator = condition.get('op');
    const path = ['document', ...pathSpec.split('/')];

    const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields', ...path]);

    if (!fieldDescriptor) {
      return null;
    }

    const dataType = getFieldDataType(fieldDescriptor);
    const isControlled = isFieldControlled(fieldDescriptor);
    const operators = getOperatorsForDataType(dataType, isControlled);

    return (
      <OperatorInput
        compact={inline}
        inline={inline}
        name="searchOp"
        operators={operators}
        readOnly={readOnly}
        value={operator}
        onCommit={this.handleOperatorCommit}
      />
    );
  }

  renderValueInput() {
    const {
      condition,
      config,
      inline,
      readOnly,
      recordType,
    } = this.props;

    const pathSpec = condition.get('path');

    let valueSearchField = null;

    if (pathSpec) {
      const operator = condition.get('op');
      const value = condition.get('value');

      const path = ['document', ...pathSpec.split('/')];
      const name = path[path.length - 1];
      const parentPath = path.slice(0, path.length - 1);

      const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields', ...path]);

      if (!fieldDescriptor) {
        return null;
      }

      const dataType = getFieldDataType(fieldDescriptor);

      if (operatorExpectsValue(operator)) {
        const ValueSearchFieldComponent = (operator === OP_RANGE || operator === OP_NOT_RANGE)
          ? RangeSearchField
          : SearchField;

        valueSearchField = (
          <ValueSearchFieldComponent
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
        );
      }
    }

    return (
      <div>{valueSearchField}</div>
    );
  }

  renderRemoveButton() {
    const {
      readOnly,
    } = this.props;

    if (readOnly) {
      return null;
    }

    return (
      <RemoveConditionButton onClick={this.handleRemoveButtonClick} />
    );
  }

  render() {
    const {
      inline,
    } = this.props;

    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className} ref={this.handleRef}>
        {this.renderFieldInput()}
        {inline ? ' ' : null}
        {this.renderOperatorInput()}
        {inline ? ' ' : null}
        {this.renderValueInput()}
        {this.renderRemoveButton()}
      </div>
    );
  }
}

FieldConditionInput.propTypes = propTypes;
