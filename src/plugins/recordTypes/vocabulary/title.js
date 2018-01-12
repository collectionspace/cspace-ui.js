export default () => (data) => {
  if (!data) {
    return '';
  }

  return data.getIn(['document', 'ns2:vocabularies_common', 'displayName']);
};
