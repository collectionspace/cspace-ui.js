import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import FooterContainer from '../../containers/sections/FooterContainer';
import Logo from '../sections/Logo';
import styles from '../../../styles/cspace-ui/PublicPage.css';

const propTypes = {
  decorated: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  decorated: true,
};

const contextTypes = {
  config: PropTypes.shape({
    logo: PropTypes.string,
    pluginInfo: PropTypes.object,
    serverUrl: PropTypes.string,
  }),
  intl: intlShape,
};

export default function PublicPage(props, context) {
  const {
    decorated,
    children,
  } = props;

  const {
    config,
    intl,
  } = context;

  let header;

  if (decorated) {
    header = (
      <header>
        <Logo config={config} />
      </header>
    );
  }

  const footer = decorated ? <FooterContainer config={config} intl={intl} /> : null;

  return (
    <div className={styles.common}>
      {header}
      {children}
      {footer}
    </div>
  );
}

PublicPage.propTypes = propTypes;
PublicPage.defaultProps = defaultProps;
PublicPage.contextTypes = contextTypes;
