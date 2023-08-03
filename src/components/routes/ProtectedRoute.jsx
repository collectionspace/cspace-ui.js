import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import Immutable from 'immutable';
import ProtectedPage from '../pages/ProtectedPage';

const propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  decorated: PropTypes.bool,
  openModalName: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  screenName: PropTypes.string,
  username: PropTypes.string,
  userPrefsLoaded: PropTypes.bool,
  closeModal: PropTypes.func,
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
    ...remainingProps
  } = props;

  return (
    <Route
      {...remainingProps}
      render={(routeProps) => (
        username ? (
          <ProtectedPage
            openModalName={openModalName}
            perms={perms}
            screenName={screenName}
            username={username}
            userPrefsLoaded={userPrefsLoaded}
            decorated={decorated}
            closeModal={closeModal}
            {...routeProps}
          >
            <Component {...routeProps} />
          </ProtectedPage>
        ) : (
          <Redirect
            to={{
              pathname: '/authorize',
              state: {
                continuation: routeProps.location ? routeProps.location.pathname : undefined,
              },
            }}
          />
        )
      )}
    />
  );
}

ProtectedRoute.propTypes = propTypes;
