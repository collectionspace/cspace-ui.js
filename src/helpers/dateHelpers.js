/* eslint-disable import/prefer-default-export */

export const formatLocalDateTime = (value, { intl }) =>
  intl.formatDate(value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // timeZoneName: 'short',
  });

/* eslint-enable import/prefer-default-export */
