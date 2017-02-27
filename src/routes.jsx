import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';
import defaults from 'lodash/defaults';

import AdminPage from './components/pages/AdminPage';
import CreatePage from './components/pages/CreatePage';
import DashboardPage from './components/pages/DashboardPage';
import PublicPage from './components/pages/PublicPage';
import RecordPageContainer from './containers/pages/RecordPageContainer';
import RootPage from './components/pages/RootPage';
import SearchPageContainer from './containers/pages/SearchPageContainer';
import SearchResultPageContainer from './containers/pages/SearchResultPageContainer';

import LoginPageContainer from './containers/pages/LoginPageContainer';
import LogoutPageContainer from './containers/pages/LogoutPageContainer';
import ProtectedPageContainer from './containers/pages/ProtectedPageContainer';

import withClassName from './enhancers/withClassName';

const defaultRouteConfig = {
  className: '',
  index: '/dashboard',
};

export default (routeConfig) => {
  const {
    className,
    index,
    onEnterProtected,
  } = defaults({}, routeConfig, defaultRouteConfig);

  // These route definitions use component-less child routes instead of optional parameters,
  // so that react-router can correctly determine if a Link is active.
  // See https://github.com/ReactTraining/react-router/issues/3277#issuecomment-209004966

  return (
    <Route path="/" component={withRouter(withClassName(RootPage, className))}>
      <IndexRedirect to={index} />

      <Route component={PublicPage}>
        <Route path="login" component={LoginPageContainer} />
        <Route path="logout" component={LogoutPageContainer} />
      </Route>

      <Route component={ProtectedPageContainer} onEnter={onEnterProtected}>
        <Route path="dashboard" component={DashboardPage} />
        <Route path="create" component={CreatePage} />

        <Route path="search" component={SearchPageContainer}>
          <Route path=":recordType">
            <Route path=":vocabulary" />
          </Route>
        </Route>

        <Route
          path="list/:recordType/:vocabulary/:csid/:subresource"
          component={SearchResultPageContainer}
        />

        <Route
          path="list/:recordType/:csid/:subresource"
          component={SearchResultPageContainer}
        />

        <Route path="list/:recordType" component={SearchResultPageContainer}>
          <Route path=":vocabulary" />
        </Route>

        <Route path="record/:recordType" component={RecordPageContainer}>
          <Route path=":path1">
            <Route path=":path2" />
          </Route>
        </Route>

        <Route path="admin" component={AdminPage} />
      </Route>
    </Route>
  );
};
