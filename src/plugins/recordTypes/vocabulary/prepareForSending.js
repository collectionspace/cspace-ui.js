export default (data) => {
  // Set the order on each term to its position in the list.

  const termsPath = ['document', 'jaxb:abstract-common-list', 'list-item'];
  const terms = data.getIn(termsPath);

  if (!terms) {
    return data;
  }

  const updatedTerms = terms.filter(term => !!term).map((term, index) =>
    term.set('order', index.toString().padStart(4, '0')));

  if (updatedTerms.size === 0) {
    return data.deleteIn(termsPath);
  }

  return data.setIn(termsPath, updatedTerms);
};
