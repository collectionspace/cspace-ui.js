export default function prepareRecordData(data) {
  // Filter out the core schema and account information parts.

  let document = data.get('document')
    .filter((value, key) =>
      (key !== 'ns2:collectionspace_core' && key !== 'ns2:account_permission'));

  // For each remaining part, move XML attribute and namespace declaration properties (those
  // that start with @) to the top, since the REST API requires this.

  for (const key of document.keys()) {
    if (key.charAt(0) !== '@') {
      const part = document.get(key);

      const sortedPart = part.sortBy(
        (value, name) => name,
        (nameA, nameB) => {
          const firstCharA = nameA.charAt(0);
          const firstCharB = nameB.charAt(0);

          if (firstCharA === firstCharB) {
            return 0;
          }

          if (firstCharA === '@') {
            return -1;
          }

          if (firstCharB === '@') {
            return 1;
          }

          return 0;
        }
      );

      document = document.set(key, sortedPart);
    }
  }

  return data.set('document', document);
}
