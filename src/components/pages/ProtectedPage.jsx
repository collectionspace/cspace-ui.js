import React from 'react';
import PropTypes from 'prop-types';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const propTypes = {
  history: PropTypes.object,
  screenName: PropTypes.string,
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function ProtectedPage(props) {
  const {
    history,
    screenName,
    username,
    children,
  } = props;

  return (
    <div>
      <Header history={history} screenName={screenName || username} />
      {children}
      <Footer />
    </div>
  );
}

ProtectedPage.propTypes = propTypes;
