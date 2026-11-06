/* global window */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

/**
 * Moves keyboard focus to the main heading of the page whenever the route changes, so that screen
 * readers announce the new page. In a single page application no document load event fires on
 * client-side navigation, so screen readers otherwise remain silent.
 */

const propTypes = {
  rootRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  pollInterval: PropTypes.number,
  timeout: PropTypes.number,
};

const defaultProps = {
  pollInterval: 50,
  timeout: 5000,
};

const getHeadingText = (heading) => heading.textContent.trim();

const isBusy = (element) => !!element.closest('[aria-busy="true"]');

export default function RouteFocusManager(props) {
  const {
    pollInterval,
    rootRef,
    timeout,
  } = props;

  const { pathname } = useLocation();

  const lastFocusRef = useRef({
    element: null,
    text: null,
  });

  useEffect(() => {
    const startTime = Date.now();

    let timer = null;

    const focus = (element, text) => {
      const last = lastFocusRef.current;

      if (element === last.element && text === last.text) {
        // The page didn't change. Leave focus where it is.

        return;
      }

      lastFocusRef.current = { element, text };

      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }

      element.focus();
    };

    const check = () => {
      timer = null;

      const root = rootRef.current;

      if (!root) {
        return;
      }

      const main = root.querySelector('main');
      const scope = main || root;
      const heading = scope.querySelector('h1');
      const isTimedOut = (Date.now() - startTime) >= timeout;

      if (heading) {
        const text = getHeadingText(heading);

        if ((text && !isBusy(heading)) || isTimedOut) {
          focus(heading, text);

          return;
        }
      } else if (isTimedOut) {
        if (main) {
          focus(main, null);
        }

        return;
      }

      timer = window.setTimeout(check, pollInterval);
    };

    timer = window.setTimeout(check, 0);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [pathname, pollInterval, rootRef, timeout]);

  return null;
}

RouteFocusManager.propTypes = propTypes;
RouteFocusManager.defaultProps = defaultProps;
