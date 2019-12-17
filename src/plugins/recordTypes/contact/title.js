export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'contacts_common');

  if (!common) {
    return '';
  }

  return deepGet(common, ['emailGroupList', 'emailGroup', 0, 'email']);
};
