export const ADD_OPTIONS = 'ADD_OPTIONS';

export const addOptions = (options, messageDescriptors) => {
  const mergedOptions = {};

  Object.keys(options).forEach((optionListName) => {
    const values = options[optionListName];
    const descriptors = messageDescriptors[optionListName];

    mergedOptions[optionListName] = values.map((value) => {
      const merged = {
        value,
      };

      if (descriptors && descriptors[value]) {
        merged.messageDescriptor = descriptors[value];
      }

      return merged;
    });
  });

  return {
    type: ADD_OPTIONS,
    payload: mergedOptions,
  };
};
