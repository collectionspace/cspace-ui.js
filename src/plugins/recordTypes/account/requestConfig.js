export default (requestType) => {
  if (requestType === 'read') {
    return {
      params: {
        showRoles: true,
      },
    };
  }

  return undefined;
};
