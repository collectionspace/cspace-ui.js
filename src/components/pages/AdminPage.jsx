import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router';
import Immutable from 'immutable';
import TermsPage from './TermsPage';
import UsersPage from './UsersPage';
import RolesPageContainer from '../../containers/pages/RolesPageContainer';
import AdminNavBar from '../admin/AdminNavBar';
import TitleBar from '../sections/TitleBar';
import notifyMounted from '../../enhancers/notifyMounted';
import withConfig from '../../enhancers/withConfig';
import { canList } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/AdminPage.css';

const messages = defineMessages({
  title: {
    id: 'adminPage.title',
    defaultMessage: 'Administration',
  },
});

const renderRoute = (basename, tab, onTabChange) => {
  const { name, component } = tab;

  return (
    <Route
      key={name}
      path={`${basename}/${name}/:csid?`}
      component={notifyMounted(withConfig(component), onTabChange, name)}
    />
  );
};

const tabs = [
  { name: 'vocabulary', component: TermsPage },
  { name: 'account', component: UsersPage },
  { name: 'authrole', component: RolesPageContainer },
];

const propTypes = {
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredTab: PropTypes.string,
  onTabChange: PropTypes.func,
};

export default function AdminPage(props) {
  const {
    match,
    perms,
    preferredTab,
    onTabChange,
  } = props;

  const basename = match.url;
  const title = <FormattedMessage {...messages.title} />;
  const permittedTabs = tabs.filter(tab => canList(tab.name, perms));

  if (permittedTabs.length === 0) {
    return null;
  }

  const redirectTabName = preferredTab || permittedTabs[0].name;
  const routes = permittedTabs.map(tab => renderRoute(basename, tab, onTabChange));

  return (
    <div className={styles.common}>
      <TitleBar title={title} />

      <AdminNavBar basename={basename} tabs={permittedTabs} />

      <Switch>
        <Redirect exact path={basename} to={`${basename}/${redirectTabName}`} />
        {routes}
      </Switch>
    </div>
  );
}

AdminPage.propTypes = propTypes;
