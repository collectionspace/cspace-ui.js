import React, { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Field from '../record/Field';
import orderIndicatorStyles from '../../../styles/cspace-ui/SearchOrderIndicator.css';
import { TextInput } from '../../helpers/configContextInputs';

const messages = defineMessages({
  or: {
    id: 'searchField.or',
    description: 'The label used to indicate search terms that are or\'ed together.',
    defaultMessage: 'or',
  },
});

const propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Immutable.List)]),
  readOnly: PropTypes.bool,
  repeating: PropTypes.bool,
  onCommit: PropTypes.func,
  forceTextInput: PropTypes.bool,
};

const defaultProps = {
  repeating: true,
};

export default class SearchField extends Component {
  constructor() {
    super();

    this.handleCommit = this.handleCommit.bind(this);
    this.handleAddInstance = this.handleAddInstance.bind(this);
    this.handleRemoveInstance = this.handleRemoveInstance.bind(this);
    this.renderOrderIndicator = this.renderOrderIndicator.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      forceTextInput, value, parentPath, name, onCommit,
    } = this.props;

    // If forceTextInput changed, reset value to null
    if (forceTextInput !== prevProps.forceTextInput && value !== null && onCommit) {
      const path = parentPath ? [...parentPath, name] : [name];
      onCommit(path, null);
    }
  }

  handleCommit(path, value) {
    const {
      repeating,
      onCommit,
      value: currentValue,
    } = this.props;

    if (onCommit) {
      if (repeating) {
        let updatedValue = currentValue;

        if (!Immutable.List.isList(updatedValue)) {
          updatedValue = Immutable.List.of(updatedValue);
        }

        const [...fieldPath] = path;
        const index = fieldPath.pop();

        updatedValue = updatedValue.set(index, value);

        onCommit(fieldPath, updatedValue);
      } else if (typeof value === 'boolean') {
        let stringValue;

        if (value === true) {
          stringValue = 'true';
        } else if (value === false) {
          stringValue = 'false';
        }

        onCommit(path, stringValue);
      } else {
        onCommit(path, value);
      }
    }
  }

  handleAddInstance(path) {
    const {
      value,
      onCommit,
    } = this.props;

    if (onCommit) {
      let updatedValue = value;

      if (!Immutable.List.isList(updatedValue)) {
        updatedValue = Immutable.List.of(updatedValue);
      }

      updatedValue = updatedValue.push(null);

      onCommit(path, updatedValue);
    }
  }

  handleRemoveInstance(path) {
    const {
      value,
      onCommit,
    } = this.props;

    if (onCommit) {
      const [...fieldPath] = path;
      const index = fieldPath.pop();

      onCommit(fieldPath, value.delete(index));
    }
  }

  renderOrderIndicator(orderNumber) {
    const {
      readOnly,
    } = this.props;

    if (readOnly) {
      return (orderNumber > 1 ? <div>, </div> : null);
    }

    return (
      <div className={orderIndicatorStyles.common}>
        <div>{orderNumber > 1 ? <FormattedMessage {...messages.or} /> : null}</div>
      </div>
    );
  }

  render() {
    const {
      parentPath,
      name,
      value,
      readOnly,
      repeating,
      forceTextInput,
    } = this.props;

    const repeatingProps = {};

    if (repeating) {
      repeatingProps.repeating = true;
      repeatingProps.reorderable = false;
      repeatingProps.renderOrderIndicator = this.renderOrderIndicator;
      repeatingProps.onAddInstance = this.handleAddInstance;
      repeatingProps.onRemoveInstance = this.handleRemoveInstance;
    }

    return forceTextInput ? (
      <TextInput
        parentPath={parentPath}
        name={name}
        asText={readOnly}
        value={value}
        onCommit={this.handleCommit}
      // Do not allow multiline text fields.
        multiline={false}
        {...repeatingProps}
      />
    ) : (
      <Field
        label={undefined}
        parentPath={parentPath}
        name={name}
        asText={readOnly}
        value={value}
        viewType="search"
        onCommit={this.handleCommit}
        // Do not allow multiline text fields.
        multiline={false}
        // Do not disable options in menus.
        ignoreDisabledOptions
        // Do not show quick add on autocomplete inputs.
        showQuickAdd={false}
        {...repeatingProps}
      />
    );
  }
}

SearchField.propTypes = propTypes;
SearchField.defaultProps = defaultProps;
