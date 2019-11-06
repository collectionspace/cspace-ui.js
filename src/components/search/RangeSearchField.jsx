import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import SearchField from './SearchField';
import styles from '../../../styles/cspace-ui/RangeSearchField.css';

const messages = defineMessages({
  fields: {
    id: 'RangeSearchField.fields',
    defaultMessage: '{startField} and {endField}',
  },
});

const propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Immutable.List),
  ]),
  readOnly: PropTypes.bool,
  inline: PropTypes.bool,
  onCommit: PropTypes.func,
};

const defaultProps = {
  value: Immutable.List(),
};

export default class RangeSearchField extends Component {
  constructor() {
    super();

    this.handleStartFieldCommit = this.handleStartFieldCommit.bind(this);
    this.handleEndFieldCommit = this.handleEndFieldCommit.bind(this);
  }

  handleStartFieldCommit(path, startValue) {
    const {
      value,
      onCommit,
    } = this.props;

    if (onCommit) {
      const nextValue = Immutable.List.isList(value)
        ? value.set(0, startValue)
        : Immutable.List.of(startValue);

      onCommit(path, nextValue);
    }
  }

  handleEndFieldCommit(path, endValue) {
    const {
      value,
      onCommit,
    } = this.props;

    if (onCommit) {
      const nextValue = Immutable.List.isList(value)
        ? value.set(1, endValue)
        : Immutable.List.of(value).set(1, endValue);

      onCommit(path, nextValue);
    }
  }

  render() {
    const {
      inline,
      parentPath,
      name,
      value,
      readOnly,
    } = this.props;

    const normalizedValue = Immutable.List.isList(value) ? value : Immutable.List.of(value);

    const startField = (
      <SearchField
        parentPath={parentPath}
        name={name}
        value={normalizedValue.get(0)}
        readOnly={readOnly}
        repeating={false}
        onCommit={this.handleStartFieldCommit}
      />
    );

    const endField = (
      <SearchField
        parentPath={parentPath}
        name={name}
        value={normalizedValue.get(1)}
        readOnly={readOnly}
        repeating={false}
        onCommit={this.handleEndFieldCommit}
      />
    );

    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className}>
        <FormattedMessage
          {...messages.fields}
          tagName="div"
          values={{ startField, endField }}
        />
      </div>
    );
  }
}

RangeSearchField.propTypes = propTypes;
RangeSearchField.defaultProps = defaultProps;
