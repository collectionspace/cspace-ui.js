import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import PublicPage from '../pages/PublicPage';

const propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  decorated: PropTypes.bool,
};

export default function PublicRoute(props) {
  const {
    component: Component,
    decorated,
    ...remainingProps
  } = props;

  return (
    <Route
      {...remainingProps}
      render={(routeProps) => (
        <PublicPage
          decorated={decorated}
          {...routeProps}
        >
          <Component {...routeProps} />
        </PublicPage>
      )}
    />
  );
}

PublicRoute.propTypes = propTypes;
