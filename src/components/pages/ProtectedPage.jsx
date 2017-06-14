import React from 'react';
import PropTypes from 'prop-types';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function ProtectedPage(props) {
  const {
    username,
    children,
  } = props;

  return (
    <div>
      <Header
        username={username}
      />
      {children}
      <Footer />
    </div>
  );
}

ProtectedPage.propTypes = propTypes;
