const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const isShorterThan6Chars = (field) => field.length < 6;
const isEmpty = (field) => {
  if (field === null) return true;
  return field.trim().length === 0;
};
const hasUppercaseCase = (field) => field.toLowerCase() === field;
const hasLowerCase = (field) => field.toUpperCase() === field;
const hasDigit = (field) => !/\d/.test(field);
const isLessThanZero = (price) => price <= 0;
const areImagesUpload = (images) => images.length > 0;

// SIGN UP VALIDATOR
export const signUpValidator = (data) => {
  let errors = {};
  if (isEmpty(data.fullName)) errors.fullName = "Required*";
  if (isEmpty(data.nickName)) errors.nickName = "Required*";
  if (isEmpty(data.location)) errors.location = "Required*";
  if (!isEmail(data.email)) errors.email = "Bad format";

  if (
    hasDigit(data.password) ||
    isShorterThan6Chars(data.password) ||
    hasUppercaseCase(data.password) ||
    hasLowerCase(data.password)
  )
    errors.password = "Password is too week";

  if (isEmpty(data.password)) errors.password = "Required*";
  if (isEmpty(data.email)) errors.email = "Required*";

  return errors;
};

// ADD PRODUCT VALIDATOR
export const addProductValidator = (data) => {
  let errors = {};
  if (
    isEmpty(data.brand) ||
    isEmpty(data.description) ||
    isEmpty(data.type) ||
    isEmpty(data.condition) ||
    isEmpty(data.gender) ||
    isLessThanZero(data.price) ||
    !areImagesUpload(data.images)
  )
    errors.general = "All fields are required";
  return errors;
};
