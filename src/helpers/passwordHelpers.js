export const isValidPassword = (password, passwordRequirements) => {
  const lower = /[a-z]/; // can do \p{Ll}/v as well
  const upper = /[A-Z]/;
  const digit = /[\d]/;
  const special = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
  const errors = [];

  // max length check for bcrypt which only accepts up to 72 bytes
  const maxLength = 72;
  const encoder = new TextEncoder();
  if (encoder.encode(password).length > maxLength) {
    errors.push({ errorCode: 'errorTooLong', values: { maxLength } });
  }

  const minLength = passwordRequirements?.minLength || 8;
  if (password.length < minLength) {
    errors.push({ errorCode: 'errorTooShort', values: { minLength } });
  }

  if (passwordRequirements) {
    if (passwordRequirements.requireLowerCase && !lower.test(password)) {
      errors.push({ errorCode: 'errorMissingLower' });
    }
    if (passwordRequirements.requireUpperCase && !upper.test(password)) {
      errors.push({ errorCode: 'errorMissingUpper' });
    }
    if (passwordRequirements.requireDigit && !digit.test(password)) {
      errors.push({ errorCode: 'errorMissingDigit' });
    }
    if (passwordRequirements.requireSpecial && !special.test(password)) {
      errors.push({ errorCode: 'errorMissingSpecial' });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export default {};
