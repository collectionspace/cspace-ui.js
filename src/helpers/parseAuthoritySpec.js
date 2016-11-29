export default authoritySpec => authoritySpec.split(',').map((authVocab) => {
  const [
    authorityName,
    vocabularyName,
  ] = authVocab.split('/');

  return {
    authorityName,
    vocabularyName,
  };
});
