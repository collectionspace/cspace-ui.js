export const ADD_OPTION_LISTS = 'ADD_OPTION_LISTS';

export const addOptionLists = (optionLists) => {
  const mergedOptionLists = {};

  Object.keys(optionLists).forEach((optionListName) => {
    const {
      values,
      messageDescriptors,
    } = optionLists[optionListName];

    mergedOptionLists[optionListName] = values.map((value) => {
      const merged = {
        value,
      };

      if (messageDescriptors && messageDescriptors[value]) {
        merged.messageDescriptor = messageDescriptors[value];
      }

      return merged;
    });
  });

  return {
    type: ADD_OPTION_LISTS,
    payload: mergedOptionLists,
  };
};
