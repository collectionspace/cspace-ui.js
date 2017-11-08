import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const propTypes = {
  decorated: PropTypes.bool,
  history: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  screenName: PropTypes.string,
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  decorated: true,
};

export default function ProtectedPage(props) {
  const {
    decorated,
    history,
    perms,
    screenName,
    username,
    children,
  } = props;

  const header = decorated
    ? <Header history={history} perms={perms} screenName={screenName || username} />
    : null;

  const footer = decorated ? <Footer /> : null;

  return (
    <div>
      {header}
      {children}
      {footer}
    </div>
  );
}

ProtectedPage.propTypes = propTypes;
ProtectedPage.defaultProps = defaultProps;
