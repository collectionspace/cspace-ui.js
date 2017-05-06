export default (resourceID) => {
  if (resourceID) {
    return resourceID.split(',').map((resource) => {
      const [
        recordType,
        vocabulary,
      ] = resource.split('/');

      return {
        recordType,
        vocabulary,
      };
    });
  }

  return [];
};
