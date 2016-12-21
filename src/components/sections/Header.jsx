import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import KeywordSearchContainer from '../../containers/search/KeywordSearchContainer';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import withRecordTypes from '../../enhancers/withRecordTypes';
import bannerStyles from '../../../styles/cspace-ui/Banner.css';
import logoStyles from '../../../styles/cspace-ui/Logo.css';

const messages = defineMessages({
  name: {
    id: 'app.name',
    description: 'The name of the application.',
    defaultMessage: 'CollectionSpace',
  },
  keywordSearchPlaceholder: {
    id: 'keywordSearch.placeholder',
    description: 'The placeholder text to display in the keyword search input.',
    defaultMessage: 'Search keywords...',
  },
});

const propTypes = {
  intl: intlShape,
  recordTypes: PropTypes.object,
  username: PropTypes.string.isRequired,
};

function Header(props) {
  const {
    intl,
    recordTypes,
    username,
  } = props;

  const name = intl.formatMessage(messages.name);

  return (
    <header>
      <div className={bannerStyles.common}>
        <Link to="/" title={name}>
          <div className={logoStyles.common} />
        </Link>
        <KeywordSearchContainer
          intl={intl}
          recordTypes={recordTypes}
        />
        <UserMenu username={username} />
      </div>
      <NavBar />
    </header>
  );
}

Header.propTypes = propTypes;

export default injectIntl(withRecordTypes(Header));
