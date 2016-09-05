import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import AdminPage from './components/pages/AdminPage';
import CreatePage from './components/pages/CreatePage';
import DashboardPage from './components/pages/DashboardPage';
import PublicPage from './components/pages/PublicPage';
import RootPage from './components/pages/RootPage';
import SearchPage from './components/pages/SearchPage';

import LoginPageContainer from './containers/pages/LoginPageContainer';
import LogoutPageContainer from './containers/pages/LogoutPageContainer';
import ProtectedPageContainer from './containers/pages/ProtectedPageContainer';

export default onEnterProtected => (
  <Route path="/" component={RootPage}>
    <IndexRedirect to="/dashboard" />

    <Route component={PublicPage}>
      <Route path="login" component={LoginPageContainer} />
      <Route path="logout" component={LogoutPageContainer} />
    </Route>

    <Route component={ProtectedPageContainer} onEnter={onEnterProtected}>
      <Route path="dashboard" component={DashboardPage} />
      <Route path="create" component={CreatePage} />
      <Route path="search" component={SearchPage} />
      <Route path="admin" component={AdminPage} />
    </Route>
  </Route>
);
