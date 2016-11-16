export const getDisplayName = (refName) => {
  if (!refName || refName.charAt(refName.length - 1) !== "'") {
    return null;
  }

  const start = refName.indexOf("'");

  if (start < 0 || start === refName.length - 1) {
    return null;
  }

  return refName.substring(start + 1, refName.length - 1);
};

export default {
  getDisplayName,
};
