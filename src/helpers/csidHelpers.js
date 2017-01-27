const csidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}(-[0-9a-fA-F]{12})?$/;

/**
 * Determines if a given string is a valid csid.
 * @param {string} string - The string
 * @returns {boolean} True if the string is a valid csid, false otherwise.
 */
export const isCsid = string => csidPattern.test(string);

/**
 * Creates a keyword search parameter that may be used to find the record with a given csid. A
 * search performed with the resulting keyword parameter will find the record, but may also find
 * false positives. The result set must be filtered by checking the actual csid of each item.
 * @param {string} string - The csid
 * @returns {string} The keyword search parameter.
 */
export const asKeywords = csid => `"${csid.replace(/-/g, ' ')}"`;
