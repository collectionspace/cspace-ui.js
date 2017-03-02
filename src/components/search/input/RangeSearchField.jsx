import React, { Component, PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import SearchField from './SearchField';

const messages = defineMessages({
  fields: {
    id: 'RangeSearchField.fields',
    defaultMessage: '{startField} and {endField}',
  },
});

const propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.instanceOf(Immutable.List),
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
      onCommit(path, value.set(0, startValue));
    }
  }

  handleEndFieldCommit(path, endValue) {
    const {
      value,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(path, value.set(1, endValue));
    }
  }

  render() {
    const {
      parentPath,
      name,
      value,
    } = this.props;

    const startField = (
      <SearchField
        parentPath={parentPath}
        name={name}
        value={value.get(0)}
        onCommit={this.handleStartFieldCommit}
      />
    );

    const endField = (
      <SearchField
        parentPath={parentPath}
        name={name}
        value={value.get(1)}
        onCommit={this.handleEndFieldCommit}
      />
    );

    return (
      <FormattedMessage
        {...messages.fields}
        tagName="div"
        values={{ startField, endField }}
      />
    );
  }
}

RangeSearchField.propTypes = propTypes;
RangeSearchField.defaultProps = defaultProps;
