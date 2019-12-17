export default (data) => {
  // Set the order on each term to its position in the list.

  const termsPath = ['document', 'ns2:abstract-common-list', 'list-item'];
  const terms = data.getIn(termsPath);

  if (!terms) {
    return data;
  }

  const updatedTerms = terms
    .filter((term) => !!term)
    .map((term, index) => term
      .set('order', index.toString().padStart(4, '0'))
      // Remove fields that the services layer would ignore anyway.
      .delete('rev')
      .delete('sas')
      .delete('proposed')
      .delete('uri')
      .delete('updatedAt')
      .delete('workflowState')
      .delete('refName')
      .delete('deprecated'));

  if (updatedTerms.size === 0) {
    return data.deleteIn(termsPath);
  }

  return data.setIn(termsPath, updatedTerms);
};
