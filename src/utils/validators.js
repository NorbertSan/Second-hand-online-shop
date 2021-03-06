const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const isShorterThan6Chars = (field) => field.length < 6;
const isEmpty = (field) => {
  if (field === null) return true;
  return field.trim().length === 0;
};
const hasMoreThan20Chars = (field) => field.length > 20;
const hasUppercaseCase = (field) => field.toLowerCase() === field;
const hasLowerCase = (field) => field.toUpperCase() === field;
const hasDigit = (field) => !/\d/.test(field);
const isLessThanZero = (price) => price <= 0;
const areImagesUpload = (images) => images.length > 0;
const hasMoreThan100Chars = (field) => field.length > 100;
const hasMoreThan2000Chars = (field) => field.length > 2000;
const isInteger = (field) => Number.isInteger(field);
const has9Digit = (field) => field.toString().length === 9;
const isZipCode = (field) => {
  const parts = field.split("-");
  const [firstPart, secondPart] = parts;
  if (
    field[2] !== "-" ||
    field.length !== 6 ||
    parts.length !== 2 ||
    !Number.isInteger(Number(firstPart)) ||
    !Number.isInteger(Number(secondPart)) ||
    firstPart.length !== 2 ||
    secondPart.length !== 3
  )
    return false;
  else return true;
};

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
  if (hasMoreThan20Chars(data.password))
    errors.password = "Password is too long";
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
    isEmpty(data.size) ||
    isEmpty(data.gender) ||
    isLessThanZero(data.price) ||
    !areImagesUpload(data.images)
  )
    errors.general = "All fields are required";
  return errors;
};

// ADD COMMENT VALIDATOR
export const addCommentValidator = (data) => {
  let errors = {};
  if (isLessThanZero(data.stars)) errors.stars = "*Required";
  if (isEmpty(data.body)) errors.body = "*Required";

  return errors;
};

// CHANGE USER INFO VALIDATOR
export const changeUserInfoValidator = (data) => {
  let errors = {};
  if (isEmpty(data.fullName)) errors.fullName = "*Required";
  if (hasMoreThan100Chars(data.fullName)) errors.fullName = "Too long";
  if (hasMoreThan2000Chars(data.bio)) errors.bio = "Too long";
  return errors;
};
// CHANGE PASSWORD VALIDATOR
export const validatePassword = (data) => {
  let errors = {};
  if (
    hasDigit(data.newPassword) ||
    isShorterThan6Chars(data.newPassword) ||
    hasUppercaseCase(data.newPassword) ||
    hasLowerCase(data.newPassword)
  )
    errors.password = "Password is too week";
  if (data.newPassword !== data.confirmNewPassword)
    errors.password = "New passwords do not match";
  if (hasMoreThan20Chars(data.newPassword))
    errors.password = "Password is too long";
  if (
    isEmpty(data.newPassword) ||
    isEmpty(data.oldPassword) ||
    isEmpty(data.confirmNewPassword)
  )
    errors.password = "Fill all the fields";
  return errors;
};

// RECIPIENT FORM VALIDATOR
export const recipientFormValidator = (data) => {
  let errors = {};
  if (isEmpty(data.fullName)) errors.fullName = "Must not be empty";
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (!isInteger(data.telephoneNumber)) errors.telephoneNumber = "Bad format";
  if (!has9Digit(data.telephoneNumber)) errors.telephoneNumber = "Bad format";
  if (!isEmail(data.email)) errors.email = "Bad format";

  return errors;
};
// ADDRESS FORM VALIDATOR
export const addressFormValidator = (data) => {
  let errors = {};
  if (isEmpty(data.city)) errors.city = "Must not be empty";
  if (isEmpty(data.zipCode)) errors.zipCode = "Must not be empty";
  if (isEmpty(data.buildingNumber)) errors.buildingNumber = "Must not be empty";
  if (!isZipCode(data.zipCode)) errors.zipCode = "Bad format";

  return errors;
};
