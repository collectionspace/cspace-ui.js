import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../sections/Footer';
import Logo from '../sections/Logo';
import styles from '../../../styles/cspace-ui/PublicPage.css';

const propTypes = {
  children: PropTypes.node,
};

const contextTypes = {
  config: PropTypes.object,
};

export default function PublicPage(props, context) {
  const {
    children,
  } = props;

  const {
    config,
  } = context;

  return (
    <div className={styles.common}>
      <header>
        <Logo config={config} />
      </header>

      {children}

      <Footer />
    </div>
  );
}

PublicPage.propTypes = propTypes;
PublicPage.contextTypes = contextTypes;
