import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import Immutable from 'immutable';
import ProtectedPage from '../pages/ProtectedPage';

const propTypes = {
  component: PropTypes.func,
  decorated: PropTypes.bool,
  openModalName: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  screenName: PropTypes.string,
  username: PropTypes.string,
  userPrefsLoaded: PropTypes.bool,
  closeModal: PropTypes.func,
  resetLogin: PropTypes.func,
};

export default function ProtectedRoute(props) {
  const {
    component: Component,
    decorated,
    openModalName,
    perms,
    screenName,
    username,
    userPrefsLoaded,
    closeModal,
    resetLogin,
    ...remainingProps
  } = props;

  return (
    <Route
      {...remainingProps}
      render={routeProps => (
        username ? (
          <ProtectedPage
            openModalName={openModalName}
            perms={perms}
            screenName={screenName}
            username={username}
            userPrefsLoaded={userPrefsLoaded}
            decorated={decorated}
            closeModal={closeModal}
            resetLogin={resetLogin}
            {...routeProps}
          >
            <Component {...routeProps} />
          </ProtectedPage>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                continuation: routeProps.location,
              },
            }}
          />
        )
      )}
    />
  );
}

ProtectedRoute.propTypes = propTypes;
