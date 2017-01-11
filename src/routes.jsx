import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';
import defaults from 'lodash/defaults';

import AdminPage from './components/pages/AdminPage';
import CreatePage from './components/pages/CreatePage';
import DashboardPage from './components/pages/DashboardPage';
import PublicPage from './components/pages/PublicPage';
import RecordPage from './components/pages/RecordPage';
import RootPage from './components/pages/RootPage';
import SearchPage from './components/pages/SearchPage';
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
    onEnterRecord,
    onEnterProtected,
  } = defaults({}, routeConfig, defaultRouteConfig);

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
        <Route path="search" component={SearchPage} />
        <Route path="search/:recordType(/:vocabulary)" component={SearchResultPageContainer} />
        <Route
          path="record/:recordType(/:csid)"
          component={RecordPage}
          onEnter={onEnterRecord}
        />
        <Route path="admin" component={AdminPage} />
      </Route>
    </Route>
  );
};
