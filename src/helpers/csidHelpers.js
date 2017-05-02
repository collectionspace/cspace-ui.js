const csidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}(-[0-9a-fA-F]{12})?$/;

const urnCsidPattern = /^urn:cspace:name\(\w+\)$/;

/**
 * Determines if a given string is a valid guid-style csid.
 * @param {string} string - The string
 * @returns {boolean} True if the string is a valid csid, false otherwise.
 */
export const isCsid = string => csidPattern.test(string);

/**
 * Determines if a given string is a valid URN-style csid. A URN-style csid may be substituted
 * for a guid-style csid for certain uses.
 * @param {string} string - The string
 * @returns {boolean} True if the string is a valid URN-style csid, false otherwise.
 */
export const isUrnCsid = string => urnCsidPattern.test(string);

/**
 * Creates a keyword search parameter that may be used to find the record with a given csid. A
 * search performed with the resulting keyword parameter will find the record, but may also find
 * false positives. The result set must be filtered by checking the actual csid of each item.
 * @param {string} string - The csid
 * @returns {string} The keyword search parameter.
 */
export const asKeywords = csid => `"${csid.replace(/-/g, ' ')}"`;
