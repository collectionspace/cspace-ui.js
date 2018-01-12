import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router';
import Immutable from 'immutable';
import TermsPageContainer from '../../containers/pages/TermsPageContainer';
import UsersPageContainer from '../../containers/pages/UsersPageContainer';
import RolesPageContainer from '../../containers/pages/RolesPageContainer';
import AdminNavBar from '../admin/AdminNavBar';
import TitleBar from '../sections/TitleBar';
import { canList } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/AdminPage.css';

const messages = defineMessages({
  title: {
    id: 'adminPage.title',
    defaultMessage: 'Administration',
  },
});

const tabs = [
  'vocabulary',
  'account',
  'authrole',
];

const propTypes = {
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredTab: PropTypes.string,
};

export default function AdminPage(props) {
  const {
    match,
    perms,
    preferredTab,
  } = props;

  const basename = match.url;
  const title = <FormattedMessage {...messages.title} />;
  const permittedTabs = tabs.filter(tab => canList(tab, perms));

  if (permittedTabs.length === 0) {
    return null;
  }

  const redirectTabName = preferredTab || permittedTabs[0];

  return (
    <div className={styles.common}>
      <TitleBar title={title} updateDocumentTitle />

      <AdminNavBar basename={basename} tabs={permittedTabs} />

      <Switch>
        <Redirect exact path={basename} to={`${basename}/${redirectTabName}`} />

        <Route path={`${basename}/vocabulary/:csid?`} component={TermsPageContainer} />
        <Route path={`${basename}/account/:csid?`} component={UsersPageContainer} />
        <Route path={`${basename}/authrole/:csid?`} component={RolesPageContainer} />
      </Switch>
    </div>
  );
}

AdminPage.propTypes = propTypes;
