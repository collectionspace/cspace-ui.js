import React from 'react';
import { components as inputComponents } from 'cspace-input';
import PropTypes from 'prop-types';
import styles from '../../../../styles/cspace-ui/ButtonBar.css';

const { Button } = inputComponents;

const toggleButtonProps = {
  label: PropTypes.string,
  style: PropTypes.any,
  name: PropTypes.string,
};

export function ToggleButton(props) {
  const {
    label,
    style,
    name,
    ...remainingProps
  } = props;

  return (
    <Button
      className={style}
      name={name}
      {...remainingProps}
    >
      {label}
    </Button>
  );
}

ToggleButton.propTypes = toggleButtonProps;

const propTypes = {
  items: PropTypes.array,
  renderButton: PropTypes.func,
  renderSidebarToggle: PropTypes.func,
};

/**
 * todo: figure out styling
 *
 * also a side note - we might want this to be part of the
 * select bar
 *
 * @param {*} param0
 * @returns
 */
export function ToggleButtonContainer({ items, renderButton, renderSidebarToggle }) {
  const toggleStyles = {
    marginLeft: 'auto',
  };

  return (
    <div className={styles.common} style={toggleStyles}>
      {items.map((item) => renderButton(item))}
      {renderSidebarToggle()}
    </div>
  );
}

ToggleButtonContainer.propTypes = propTypes;
