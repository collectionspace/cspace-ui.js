import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import RootPage from './components/RootPage';
import PublicPage from './components/PublicPage';
import ProtectedPage from './containers/ProtectedPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './components/LogoutPage';
import DashboardPage from './components/DashboardPage';
import SearchPage from './components/SearchPage';

export default (enterProtected) => (
  <Route path="/" component={RootPage}>
    <IndexRedirect to="/dashboard" />

    <Route component={PublicPage}>
      <Route path="login" component={LoginPage} />
      <Route path="logout" component={LogoutPage} />
    </Route>

    <Route component={ProtectedPage} onEnter={enterProtected}>
      <Route path="dashboard" component={DashboardPage} />
      <Route path="search" component={SearchPage} />
    </Route>
  </Route>
);
