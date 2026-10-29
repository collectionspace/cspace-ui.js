import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import collectionSpaceLogoUrl from '../../../images/collectionspace.svg';
import styles from '../../../styles/cspace-ui/Logo.css';

const messages = defineMessages({
  title: {
    id: 'logo.title',
    description: 'The title (advisory text) of the CollectionSpace logo image.',
    defaultMessage: 'CollectionSpace',
  },
  institutionTitle: {
    id: 'logo.institutionTitle',
    description: 'The alternative text of the institutional logo image, displayed next to the CollectionSpace logo when the logo configuration option is set. This should be customized to the name of the institution.',
    defaultMessage: 'Institution logo',
  },
});

const propTypes = {
  config: PropTypes.shape({
    logo: PropTypes.string,
    logoLink: PropTypes.string,
  }),
  intl: intlShape,
};

function Logo(props) {
  const {
    config,
    intl,
  } = props;

  const {
    logo,
    logoLink,
  } = config;

  const title = intl.formatMessage(messages.title);

  let institutionLogo = null;

  if (logo) {
    const image = (
      <img
        alt={intl.formatMessage(messages.institutionTitle)}
        src={logo}
        className={styles.institution}
      />
    );

    institutionLogo = logoLink ? <a href={logoLink}>{image}</a> : image;
  }

  return (
    <div className={styles.common}>
      <Link to="/">
        <img alt={title} src={collectionSpaceLogoUrl} />
      </Link>

      {institutionLogo}
    </div>
  );
}

Logo.propTypes = propTypes;

export default injectIntl(Logo);
