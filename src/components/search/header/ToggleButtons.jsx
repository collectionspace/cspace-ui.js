import React from 'react';
import classNames from 'classnames';
import { components as inputComponents } from 'cspace-input';
import PropTypes from 'prop-types';
import styles from '../../../../styles/cspace-ui/ButtonBar.css';

const { Button } = inputComponents;

const toggleButtonProps = {
  className: PropTypes.any,
  icon: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
};

export function ToggleButton(props) {
  const {
    className,
    icon,
    name,
    title,
    ...remainingProps
  } = props;

  return (
    <Button
      className={classNames(className, 'material-icons')}
      name={name}
      title={title}
      {...remainingProps}
    >
      {icon}
    </Button>
  );
}

ToggleButton.propTypes = toggleButtonProps;

const propTypes = {
  items: PropTypes.array,
  renderButton: PropTypes.func,
};

/**
 * A wrapper around the ToggleButtons which puts them into a single div
 */
export function ToggleButtonContainer({ items, renderButton }) {
  const toggleStyles = {
    marginLeft: 'auto',
  };

  return (
    <div className={styles.common} style={toggleStyles}>
      {items.map((item) => renderButton(item))}
    </div>
  );
}

ToggleButtonContainer.propTypes = propTypes;
