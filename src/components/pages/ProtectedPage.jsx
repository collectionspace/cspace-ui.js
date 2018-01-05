import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import LoginModal from '../login/LoginModal';

const propTypes = {
  decorated: PropTypes.bool,
  history: PropTypes.object,
  openModalName: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  screenName: PropTypes.string,
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeModal: PropTypes.func,
};

const defaultProps = {
  decorated: true,
};

export default function ProtectedPage(props) {
  const {
    decorated,
    history,
    openModalName,
    perms,
    screenName,
    username,
    children,
    closeModal,
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

      <LoginModal
        isOpen={openModalName === LoginModal.modalName}
        onCloseButtonClick={closeModal}
      />
    </div>
  );
}

ProtectedPage.propTypes = propTypes;
ProtectedPage.defaultProps = defaultProps;
