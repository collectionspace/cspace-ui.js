import Immutable from 'immutable';
import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import getSession from '../helpers/session';

const transformDate = (input = {}) => {
  const output = {};

  output.dateDisplayDate = input.displayDate || null;
  output.scalarValuesComputed = input.scalarValuesComputed || null;

  ['earliestSingle', 'latest'].forEach((type) => {
    const inputDate = input[`${type}Date`] || {};

    [
      'year', 'month', 'day', 'era',
      'certainty', 'qualifier', 'qualifierValue', 'qualifierUnit',
    ].forEach((field) => {
      output[`date${upperFirst(type)}${upperFirst(field)}`] = inputDate[field] || null;
    });
  });

  return Immutable.fromJS(output);
};

export const parseDisplayDate = (displayDate) => () => {
  if (!displayDate) {
    return Promise.resolve({
      value: transformDate(),
    });
  }

  const requestConfig = {
    params: {
      dateToParse: displayDate,
    },
  };

  return getSession().read('structureddates', requestConfig)
    .then((response) => ({
      value: transformDate(get(response, ['data', 'ns2:structureddate_common'])),
    }))
    .catch(() => ({
      isError: true,
    }));
};

export default {};
