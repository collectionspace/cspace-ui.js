import {
  ADD_OPTION_LISTS,
} from '../constants/actionCodes';

export const addOptionLists = (optionLists) => {
  const mergedOptionLists = {};

  Object.keys(optionLists).forEach((optionListName) => {
    const {
      values,
      messages,
    } = optionLists[optionListName];

    mergedOptionLists[optionListName] = values.map((value) => {
      const merged = {
        value,
      };

      const message = messages && messages[value];

      if (message) {
        merged.message = message;
      }

      return merged;
    });
  });

  return {
    type: ADD_OPTION_LISTS,
    payload: mergedOptionLists,
  };
};

export default {};
