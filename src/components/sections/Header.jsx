import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import QuickSearchFormContainer from '../../containers/search/QuickSearchFormContainer';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import Logo from './Logo';
import withConfig from '../../enhancers/withConfig';
import bannerStyles from '../../../styles/cspace-ui/Banner.css';
import bannerMainStyles from '../../../styles/cspace-ui/BannerMain.css';
import bannerRightStyles from '../../../styles/cspace-ui/BannerRight.css';

const propTypes = {
  screenName: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: intlShape,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  userPrefsLoaded: PropTypes.bool,
};

function Header(props) {
  const {
    history,
    intl,
    config,
    perms,
    screenName,
    userPrefsLoaded,
  } = props;

  let quickSearch;

  if (userPrefsLoaded) {
    // Wait for user prefs to load, so that the record type selector will reflect the user's
    // preference.

    quickSearch = (
      <QuickSearchFormContainer
        history={history}
        intl={intl}
        config={config}
        perms={perms}
      />
    );
  }

  return (
    <header>
      <div className={bannerStyles.common}>
        <div className={bannerMainStyles.common}>
          <Logo config={config} />
          {quickSearch}
        </div>

        <div className={bannerRightStyles.common}>
          <UserMenu screenName={screenName} />
        </div>
      </div>

      <NavBar perms={perms} />
    </header>
  );
}

Header.propTypes = propTypes;

export default injectIntl(withConfig(Header));
