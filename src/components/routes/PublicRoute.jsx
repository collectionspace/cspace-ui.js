import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import PublicPage from '../pages/PublicPage';

const propTypes = {
  component: PropTypes.func,
};

export default function PublicRoute(props) {
  const {
    component: Component,
    ...remainingProps
  } = props;

  return (
    <Route
      {...remainingProps}
      render={routeProps => (
        <PublicPage {...routeProps}>
          <Component {...routeProps} />
        </PublicPage>
      )}
    />
  );
}

PublicRoute.propTypes = propTypes;
