export default () => (data) => {
  if (!data) {
    return '';
  }

  return data.getIn(['ns3:accounts_common', 'screenName']);
};
