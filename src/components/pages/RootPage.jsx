import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/RootPage.css';

export default function RootPage(props) {
  const {
    children,
    className,
  } = props;

  const classes = classNames(styles.common, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
