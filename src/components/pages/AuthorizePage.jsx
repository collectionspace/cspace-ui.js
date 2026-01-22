/* global window */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { createAuthCodeUrl } from '../../actions/login';

const propTypes = {
  config: PropTypes.shape({
    serverUrl: PropTypes.string,
  }),
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
  const dispatch = useDispatch();
  const {
    location,
  } = props;

  const {
    config,
  } = context;

  const landingPath = get(location, ['state', 'continuation']) || '';

  useEffect(() => {
    dispatch(createAuthCodeUrl(config, landingPath)).then((url) => {
      window.location.replace(url);
    });
  }, []);

  return null;
}

AuthorizePage.propTypes = propTypes;
AuthorizePage.contextTypes = contextTypes;
