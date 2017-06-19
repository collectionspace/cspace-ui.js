import React from 'react';
import PropTypes from 'prop-types';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const propTypes = {
  history: PropTypes.object,
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function ProtectedPage(props) {
  const {
    history,
    username,
    children,
  } = props;

  return (
    <div>
      <Header history={history} username={username} />
      {children}
      <Footer />
    </div>
  );
}

ProtectedPage.propTypes = propTypes;
