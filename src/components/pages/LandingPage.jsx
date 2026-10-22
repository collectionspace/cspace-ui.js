import React from 'react';
import { Helmet } from 'react-helmet';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import TitleBar from '../sections/TitleBar';
import styles from '../../../styles/cspace-ui/LandingPage.css';

const messages = defineMessages({
  documentTitle: {
    id: 'landingPage.documentTitle',
    description: 'The title of the landing page, displayed in the browser tab.',
    defaultMessage: 'Home',
  },
  title: {
    id: 'landingPage.title',
    description: 'The heading of the landing page, displayed after signing in.',
    defaultMessage: 'Welcome to CollectionSpace',
  },
  subtitle: {
    id: 'landingPage.subtitle',
    description: 'The tagline displayed below the heading of the landing page.',
    defaultMessage: 'Your collection management solution for cultural heritage organizations, museums and more.',
  },
});

const propTypes = {
  intl: intlShape.isRequired,
};

function LandingPage(props) {
  const {
    intl,
  } = props;

  return (
    <div className={styles.common}>
      <Helmet>
        <title>{intl.formatMessage(messages.documentTitle)}</title>
      </Helmet>

      <TitleBar
        title={<FormattedMessage {...messages.title} />}
        subtitle={<FormattedMessage {...messages.subtitle} />}
      />
    </div>
  );
}

LandingPage.propTypes = propTypes;

export default injectIntl(LandingPage);
