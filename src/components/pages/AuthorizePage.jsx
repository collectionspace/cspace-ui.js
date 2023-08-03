/* global window */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const propTypes = {
  config: PropTypes.shape({
    serverUrl: PropTypes.string,
  }),
  createAuthCodeUrl: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

export default function AuthorizePage(props, context) {
  const {
    createAuthCodeUrl,
    location,
  } = props;

  const {
    config,
  } = context;

  const landingPath = get(location, ['state', 'continuation']) || '';

  useEffect(() => {
    createAuthCodeUrl(config, landingPath).then((url) => {
      window.location.replace(url);
    });
  }, []);

  return null;
}

AuthorizePage.propTypes = propTypes;
AuthorizePage.contextTypes = contextTypes;
