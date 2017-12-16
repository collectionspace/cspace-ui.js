import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../sections/Footer';
import Logo from '../sections/Logo';
import styles from '../../../styles/cspace-ui/PublicPage.css';

const propTypes = {
  children: PropTypes.node,
};

export default function PublicPage(props) {
  const {
    children,
  } = props;

  return (
    <div className={styles.common}>
      <header>
        <Logo />
      </header>
      {children}
      <Footer />
    </div>
  );
}

PublicPage.propTypes = propTypes;
