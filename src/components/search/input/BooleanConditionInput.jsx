import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { baseComponents as inputComponents } from 'cspace-input';
import OptionPickerInput from '../../record/OptionPickerInput';
import RemoveConditionButton from '../RemoveConditionButton';

import {
  OP_AND,
  OP_OR,
  OP_GROUP,
} from '../../../constants/searchOperators';

import styles from '../../../../styles/cspace-ui/BooleanConditionInput.css';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  hasChildGroups: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  rootPath: PropTypes.string,
  showInlineParens: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  isNewSearchForm: PropTypes.bool,
  getSearchConditionInputComponent: PropTypes.func.isRequired,
  onCommit: PropTypes.func,
  onRemove: PropTypes.func,
};

const defaultProps = {
  showInlineParens: true,
  showRemoveButton: true,
};

const {
  MiniButton,
} = inputComponents;

const messages = {
  [OP_AND]: defineMessages({
    label: {
      id: 'booleanConditionInput.and.label',
      defaultMessage: 'and',
    },
    opSelectorLabel: {
      id: 'booleanConditionInput.and.opSelectorLabel',
      defaultMessage: 'All',
    },
  }),
  [OP_OR]: defineMessages({
    label: {
      id: 'booleanConditionInput.or.label',
      defaultMessage: 'or',
    },
    opSelectorLabel: {
      id: 'booleanConditionInput.or.opSelectorLabel',
      defaultMessage: 'Any',
    },
  }),
  opSelector: defineMessages({
    label: {
      id: 'booleanConditionInput.opSelector.label',
      defaultMessage: `{opSelectorInput} of the following conditions { operator, select,
        and {must}
        or {may}
      } be satisfied:`,
    },
  }),
  addBoolean: defineMessages({
    label: {
      id: 'booleanConditionInput.addBoolean.label',
      description: 'Label of the button to add a new boolean constraint to a boolean search',
      defaultMessage: '+ Any/All',
    },
  }),
  addField: defineMessages({
    label: {
      id: 'booleanConditionInput.addField.label',
      description: 'Label of the button to add a new field constraint to a boolean search',
      defaultMessage: '+ Field',
    },
  }),
  addGroup: defineMessages({
    label: {
      id: 'booleanConditionInput.addGroup.label',
      description: 'Label of the button to add a new group constraint to a boolean search',
      defaultMessage: '+ Group',
    },
  }),
};

export default class BooleanConditionInput extends Component {
  constructor() {
    super();

    this.handleAddBooleanButtonClick = this.handleAddBooleanButtonClick.bind(this);
    this.handleAddFieldButtonClick = this.handleAddFieldButtonClick.bind(this);
    this.handleAddGroupButtonClick = this.handleAddGroupButtonClick.bind(this);
    this.handleChildConditionCommit = this.handleChildConditionCommit.bind(this);
    this.handleChildConditionRemove = this.handleChildConditionRemove.bind(this);
    this.handleOpSelectorCommit = this.handleOpSelectorCommit.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
  }

  componentDidMount() {
    const {
      condition,
    } = this.props;

    const value = condition.get('value');

    if (value === null) {
      // The condition was just added, and the operator needs to be selected. Focus it.

      if (this.domNode) {
        const input = this.domNode.querySelector('input[data-name="booleanSearchOp"]');

        if (input) {
          input.focus();
        }
      }
    }
  }

  handleAddBooleanButtonClick() {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      const op = condition.get('op');
      const value = condition.get('value') || Immutable.List();

      // For the new nested boolean, set the operator to the opposite of the current operator,
      // since this is likely what the user wants.

      const nestedOp = (op === OP_AND ? OP_OR : OP_AND);

      const newCondition = Immutable.Map({
        op: nestedOp,
        path: null,
        value: null,
      });

      onCommit(name, condition.set('value', value.push(newCondition)));
    }
  }

  handleAddFieldButtonClick() {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      const value = condition.get('value') || Immutable.List();

      onCommit(name, condition.set('value', value.push(Immutable.Map({ path: null }))));
    }
  }

  handleAddGroupButtonClick() {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      const value = condition.get('value') || Immutable.List();

      onCommit(name, condition.set('value', value.push(Immutable.Map({
        op: OP_GROUP,
        path: null,
      }))));
    }
  }

  handleOpSelectorCommit(path, value) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(name, condition.set('op', value));
    }
  }

  handleChildConditionCommit(childName, childCondition) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = parseInt(childName, 10);

      onCommit(name, condition.setIn(['value', index], childCondition));
    }
  }

  handleChildConditionRemove(childName) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = parseInt(childName, 10);

      onCommit(name, condition.deleteIn(['value', index]));
    }
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

  renderRemoveButton() {
    const {
      readOnly,
      showRemoveButton,
    } = this.props;

    if (readOnly || !showRemoveButton) {
      return null;
    }

    return (
      <RemoveConditionButton onClick={this.handleRemoveButtonClick} />
    );
  }

  renderHeader() {
    const {
      condition,
      readOnly,
    } = this.props;

    if (readOnly) {
      return null;
    }

    const operator = condition.get('op');

    const opSelectorInput = (
      <OptionPickerInput
        blankable={false}
        name="booleanSearchOp"
        options={[
          { value: OP_OR, message: messages[OP_OR].opSelectorLabel },
          { value: OP_AND, message: messages[OP_AND].opSelectorLabel },
        ]}
        value={operator}
        onCommit={this.handleOpSelectorCommit}
      />
    );

    return (
      <header>
        <FormattedMessage
          {...messages.opSelector.label}
          tagName="div"
          values={{ opSelectorInput, operator }}
        />
        {this.renderRemoveButton()}
      </header>
    );
  }

  renderChildConditions() {
    const {
      condition,
      config,
      hasChildGroups,
      inline,
      readOnly,
      recordType,
      rootPath,
      getSearchConditionInputComponent,
      isNewSearchForm,
    } = this.props;

    const operator = condition.get('op');
    const childConditions = condition.get('value');

    if (!childConditions || childConditions.size === 0) {
      return null;
    }

    const inputs = childConditions.map((childCondition, index) => {
      const SearchConditionInputComponent = getSearchConditionInputComponent(childCondition);

      const operatorLabel = (index > 0)
        ? <FormattedMessage {...messages[operator].label} />
        : <span />;

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          {operatorLabel}
          {inline ? ' ' : null}

          <SearchConditionInputComponent
            condition={childCondition}
            config={config}
            hasChildGroups={hasChildGroups}
            index={index}
            inline={inline}
            name={`${index}`}
            readOnly={readOnly}
            recordType={recordType}
            rootPath={rootPath}
            getSearchConditionInputComponent={getSearchConditionInputComponent}
            isNewSearchForm={isNewSearchForm}
            onCommit={this.handleChildConditionCommit}
            onRemove={this.handleChildConditionRemove}
          />

          {inline ? ' ' : null}
        </li>
      );
    });

    return <ul>{inputs}</ul>;
  }

  renderFooter() {
    const {
      condition,
      hasChildGroups,
      readOnly,
    } = this.props;

    if (readOnly) {
      return null;
    }

    const operator = condition.get('op');

    let addGroupButton;

    if (hasChildGroups) {
      addGroupButton = (
        <MiniButton
          autoWidth
          name="addGroup"
          onClick={this.handleAddGroupButtonClick}
        >
          <FormattedMessage {...messages.addGroup.label} />
        </MiniButton>
      );
    }

    return (
      <footer>
        <div>
          <FormattedMessage {...messages[operator].label} />
        </div>

        <div>
          <MiniButton
            autoWidth
            name="addField"
            onClick={this.handleAddFieldButtonClick}
          >
            <FormattedMessage {...messages.addField.label} />
          </MiniButton>

          {addGroupButton}

          <MiniButton
            autoWidth
            name="addBoolean"
            onClick={this.handleAddBooleanButtonClick}
          >
            <FormattedMessage {...messages.addBoolean.label} />
          </MiniButton>
        </div>
      </footer>
    );
  }

  render() {
    const {
      inline,
      showInlineParens,
    } = this.props;

    let openParen;
    let closeParen;

    if (inline && showInlineParens) {
      openParen = <div>(</div>;
      closeParen = <div>)</div>;
    }

    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className} ref={this.handleRef}>
        {this.renderHeader()}
        {openParen}
        {this.renderChildConditions()}
        {closeParen}
        {this.renderFooter()}
      </div>
    );
  }
}

BooleanConditionInput.propTypes = propTypes;
BooleanConditionInput.defaultProps = defaultProps;
