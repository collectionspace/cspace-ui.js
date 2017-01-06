export const formatLocalDateTime = (value, { intl }) =>
  intl.formatDate(value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // timeZoneName: 'short',
  });
