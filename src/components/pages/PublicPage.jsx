import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../sections/Footer';
import styles from '../../../styles/cspace-ui/PublicPage.css';

export default function PublicPage(props) {
  const {
    children,
  } = props;

  return (
    <div className={styles.common}>
      {children}
      <Footer />
    </div>
  );
}

PublicPage.propTypes = {
  children: PropTypes.node,
};
