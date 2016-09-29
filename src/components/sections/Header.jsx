import React, { PropTypes } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import bannerStyles from '../../../styles/cspace-ui/Banner.css';
import logoStyles from '../../../styles/cspace-ui/Logo.css';

const messages = defineMessages({
  name: {
    id: 'app.name',
    description: 'The name of the application.',
    defaultMessage: 'CollectionSpace',
  },
});

function Header(props) {
  const {
    intl,
    username,
  } = props;

  const name = intl.formatMessage(messages.name);

  return (
    <header>
      <div className={bannerStyles.common}>
        <Link to="/" title={name}>
          <div className={logoStyles.common} />
        </Link>
        <UserMenu username={username} />
      </div>
      <NavBar />
    </header>
  );
}

Header.propTypes = {
  intl: PropTypes.object,
  username: PropTypes.string.isRequired,
};

export default injectIntl(Header);
