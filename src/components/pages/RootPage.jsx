import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/RootPage.css';
import favicon from '../../../images/favicon.png';
import NotificationBarContainer from '../../containers/notification/NotificationBarContainer';

const messages = defineMessages({
  title: {
    id: 'rootPage.title',
    description: 'The title of the application, displayed in the browser tab.',
    defaultMessage: 'CollectionSpace',
  },
});

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  intl: intlShape,
};

function RootPage(props) {
  const {
    children,
    className,
    intl,
  } = props;

  const classes = classNames(styles.common, className);

  return (
    <div className={classes}>
      <Helmet>
        {/* TODO: Allow nested routes to push title parts that get prepended to the root title. */}

        <title>{intl.formatMessage(messages.title)}</title>

        {/*
          * TODO: Generate a full set of icons to support a range of platforms (e.g. using
          * http://realfavicongenerator.net/)
          */}

        <link rel="shortcut icon" href={favicon} />
      </Helmet>
      {children}
      <NotificationBarContainer />
    </div>
  );
}

RootPage.propTypes = propTypes;

export default injectIntl(RootPage);
