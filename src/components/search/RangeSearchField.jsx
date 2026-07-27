import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import SearchField from './SearchField';
import styles from '../../../styles/cspace-ui/RangeSearchField.css';

const messages = defineMessages({
  fields: {
    id: 'RangeSearchField.fields',
    defaultMessage: '{startField} and {endField}',
  },
  start: {
    id: 'RangeSearchField.start',
    description: 'The accessible label of the start field of a range.',
    defaultMessage: '{fieldLabel} start',
  },
  end: {
    id: 'RangeSearchField.end',
    description: 'The accessible label of the end field of a range.',
    defaultMessage: '{fieldLabel} end',
  },
});

const propTypes = {
  'aria-label': PropTypes.string,
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
      'aria-label': ariaLabel,
      inline,
      parentPath,
      name,
      value,
      readOnly,
    } = this.props;

    const { intl } = this.context;

    const normalizedValue = Immutable.List.isList(value) ? value : Immutable.List.of(value);

    const startField = (
      <SearchField
        aria-label={ariaLabel && intl.formatMessage(messages.start, { fieldLabel: ariaLabel })}
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
        aria-label={ariaLabel && intl.formatMessage(messages.end, { fieldLabel: ariaLabel })}
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
RangeSearchField.contextTypes = {
  intl: intlShape,
};
