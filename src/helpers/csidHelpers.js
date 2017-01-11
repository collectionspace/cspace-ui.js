const csidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}(-[0-9a-fA-F]{12})?$/;

/* eslint-disable import/prefer-default-export */
export const isCsid = string => csidPattern.test(string);
/* eslint-enable import/prefer-default-export */
