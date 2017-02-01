import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import KeywordSearchFormContainer from '../../containers/search/KeywordSearchFormContainer';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import withConfig from '../../enhancers/withConfig';
import bannerStyles from '../../../styles/cspace-ui/Banner.css';
import bannerMainStyles from '../../../styles/cspace-ui/BannerMain.css';
import bannerRightStyles from '../../../styles/cspace-ui/BannerRight.css';
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
  config: PropTypes.object,
  username: PropTypes.string.isRequired,
};

function Header(props) {
  const {
    intl,
    config,
    username,
  } = props;

  const name = intl.formatMessage(messages.name);

  return (
    <header>
      <div className={bannerStyles.common}>
        <div className={bannerMainStyles.common}>
          <Link to="/" title={name}>
            <div className={logoStyles.common} />
          </Link>
          <KeywordSearchFormContainer
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
