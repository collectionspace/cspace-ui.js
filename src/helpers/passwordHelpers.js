export const isValidPassword = (password, passwordRequirements) => {
  const lower = /[a-z]/; // can do \p{Ll}/v as well
  const upper = /[A-Z]/;
  const digit = /[\d]/;
  const special = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
  const errors = [];

  if (passwordRequirements) {
    if (passwordRequirements.minLength && password.length < passwordRequirements.minLength) {
      errors.push({ errorCode: 'errorInvalidLength', values: { minLength: passwordRequirements.minLength } });
    }
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
