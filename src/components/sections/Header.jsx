import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import QuickSearchFormContainer from '../../containers/search/QuickSearchFormContainer';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import withConfig from '../../enhancers/withConfig';
import bannerStyles from '../../../styles/cspace-ui/Banner.css';
import bannerMainStyles from '../../../styles/cspace-ui/BannerMain.css';
import bannerRightStyles from '../../../styles/cspace-ui/BannerRight.css';
import logoStyles from '../../../styles/cspace-ui/Logo.css';

const messages = defineMessages({
  logoTitle: {
    id: 'header.logoTitle',
    description: 'The title (advisory text) of the logo.',
    defaultMessage: 'CollectionSpace',
  },
});

const propTypes = {
  intl: intlShape,
  config: PropTypes.object,
  username: PropTypes.string.isRequired,
};

function Header(props) {
  const {
    intl,
    config,
    username,
  } = props;

  const logoTitle = intl.formatMessage(messages.logoTitle);

  return (
    <header>
      <div className={bannerStyles.common}>
        <div className={bannerMainStyles.common}>
          <Link to="/" title={logoTitle}>
            <div className={logoStyles.common} />
          </Link>
          <QuickSearchFormContainer
            intl={intl}
            config={config}
          />
        </div>
        <div className={bannerRightStyles.common}>
          <UserMenu username={username} />
        </div>
      </div>
      <NavBar />
    </header>
  );
}

Header.propTypes = propTypes;

export default injectIntl(withConfig(Header));
