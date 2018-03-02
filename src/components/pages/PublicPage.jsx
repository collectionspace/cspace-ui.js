import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import Footer from '../sections/Footer';
import Logo from '../sections/Logo';
import styles from '../../../styles/cspace-ui/PublicPage.css';

const propTypes = {
  children: PropTypes.node,
};

const contextTypes = {
  config: PropTypes.object,
  intl: intlShape,
};

export default function PublicPage(props, context) {
  const {
    children,
  } = props;

  const {
    config,
    intl,
  } = context;

  return (
    <div className={styles.common}>
      <header>
        <Logo config={config} />
      </header>

      {children}

      <Footer config={config} intl={intl} />
    </div>
  );
}

PublicPage.propTypes = propTypes;
PublicPage.contextTypes = contextTypes;
