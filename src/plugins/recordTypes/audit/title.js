export default () => (data) => {
  if (!data) {
    return '';
  }

  const common = data.get('ns3:audit_common');

  if (!common) {
    return '';
  }

  const resource = common.get('resourceCSID');
  const date = common.get('eventDate');

  return [resource, date].filter((part) => !!part).join(' – ');
};
