export const getDisplayName = (refName) => {
  if (!refName || refName.charAt(refName.length - 1) !== "'") {
    return '';
  }

  const start = refName.indexOf("'");
  
  if (start < 0) {
    return '';
  }
  
  return refName.substring(start + 1, refName.length - 1);
};
