import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Footer from '../sections/Footer';
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
      <Footer />
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
