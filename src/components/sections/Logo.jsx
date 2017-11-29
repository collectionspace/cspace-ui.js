import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import styles from '../../../styles/cspace-ui/Logo.css';

const messages = defineMessages({
  title: {
    id: 'logo.title',
    description: 'The title (advisory text) of the application logo image.',
    defaultMessage: 'CollectionSpace',
  },
});

const propTypes = {
  intl: intlShape,
};

function Logo(props) {
  const {
    intl,
  } = props;

  const title = intl.formatMessage(messages.title);

  return (
    <div className={styles.common}>
      <Link to="/" title={title}>
        <div />
      </Link>
    </div>
  );
}

Logo.propTypes = propTypes;

export default injectIntl(Logo);
