import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router';
import Immutable from 'immutable';
import BatchPageContainer from '../../containers/pages/BatchPageContainer';
import ReportPageContainer from '../../containers/pages/ReportPageContainer';
import ToolNavBar from '../navigation/ToolNavBar';
import TitleBar from '../sections/TitleBar';
import { canList } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/AdminPage.css';

const messages = defineMessages({
  title: {
    id: 'toolPage.title',
    defaultMessage: 'Tools',
  },
});

const tabs = [
  'report',
  'batch',
];

const propTypes = {
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredTab: PropTypes.string,
};

export default function ToolPage(props) {
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

      <ToolNavBar basename={basename} tabs={permittedTabs} />

      <Switch>
        <Redirect exact path={basename} to={`${basename}/${redirectTabName}`} />

        <Route path={`${basename}/report/:csid?`} component={ReportPageContainer} />
        <Route path={`${basename}/batch/:csid?`} component={BatchPageContainer} />
      </Switch>
    </div>
  );
}

ToolPage.propTypes = propTypes;
