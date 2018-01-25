export default (requestType) => {
  if (requestType === 'read') {
    return {
      params: {
        showPerms: true,
      },
    };
  }

  return undefined;
};
