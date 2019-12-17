import React from 'react';
import PropTypes from 'prop-types';

/**
 * An enhancer that accepts a value prop, converts it to a boolean, and passes the boolean on to
 * the base component. The value 'true' is converted to true, and the value 'false' is converted
 * to false. Boolean values are passed directly to the base component.
 */
export default function withBooleanValue(BaseComponent) {
  function WithBooleanValue(props) {
    const {
      value,
      ...remainingProps
    } = props;

    let booleanValue;

    if (value === 'true') {
      booleanValue = true;
    } else if (value === 'false') {
      booleanValue = false;
    } else {
      booleanValue = value;
    }

    return (
      <BaseComponent
        value={booleanValue}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...remainingProps}
      />
    );
  }

  WithBooleanValue.propTypes = {
    ...BaseComponent.propTypes,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  return WithBooleanValue;
}
