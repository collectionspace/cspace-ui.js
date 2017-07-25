import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
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
    description: 'The title (advisory text) of the application logo image.',
    defaultMessage: 'CollectionSpace',
  },
});

const propTypes = {
  screenName: PropTypes.string.isRequired,
  history: PropTypes.object,
  intl: intlShape,
  config: PropTypes.object,
};

function Header(props) {
  const {
    history,
    intl,
    config,
    screenName,
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
            history={history}
            intl={intl}
            config={config}
          />
        </div>
        <div className={bannerRightStyles.common}>
          <UserMenu screenName={screenName} />
        </div>
      </div>
      <NavBar />
    </header>
  );
}

Header.propTypes = propTypes;

export default injectIntl(withConfig(Header));
