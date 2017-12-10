export default () => (data) => {
  if (!data) {
    return '';
  }

  return data.getIn(['ns2:role', 'displayName']);
};
