import Immutable from 'immutable';
import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import getSession from './cspace';

const transformDate = (input) => {
  const output = {};

  if (input) {
    output.dateDisplayDate = input.displayDate;
    output.scalarValuesComputed = input.scalarValuesComputed;

    ['earliestSingle', 'latest'].forEach((type) => {
      const inputDate = input[`${type}Date`];

      if (inputDate) {
        [
          'year', 'month', 'day', 'era',
          'certainty', 'qualifier', 'qualifierValue', 'qualifierUnit',
        ].forEach((field) => {
          output[`date${upperFirst(type)}${upperFirst(field)}`] = inputDate[field];
        });
      }
    });
  }

  return Immutable.fromJS(output);
};

export const parseDisplayDate = displayDate => () => {
  if (!displayDate) {
    return Promise.resolve({
      value: Immutable.Map(),
    });
  }

  const requestConfig = {
    params: {
      dateToParse: displayDate,
    },
  };

  return getSession().read('structureddates', requestConfig)
    .then(response => ({
      value: transformDate(get(response, ['data', 'ns2:structureddate_common'])),
    }))
    .catch(() => ({
      isError: true,
    }));
};

export default {};
