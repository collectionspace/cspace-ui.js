export const ADD_OPTIONS = 'ADD_OPTIONS';

export const addOptions = (optionLists) => {
  const mergedOptions = {};

  Object.keys(optionLists).forEach((optionListName) => {
    const {
      values,
      messageDescriptors,
    } = optionLists[optionListName];

    mergedOptions[optionListName] = values.map((value) => {
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
    type: ADD_OPTIONS,
    payload: mergedOptions,
  };
};
