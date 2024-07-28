import strings from '../i18n/strings';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const nameRegex = /^([\w]{1,})+([\w\s]{0,})+$/i;

// regex for atm card number
const atmCardNumberRegex = /^[0-9]{16}$/;

// regex for cvv
const cvvRegex = /^[0-9]{3}$/;

// Name validation
const validateName = (name: string) => {
  if (!name) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return nameRegex.test(name)
      ? { status: true, msg: '' }
      : {
          status: false,
          msg: strings.validName,
        };
  }
};

// ATM card number validation
const validateCardNumber = (atmCardNumber: string) => {
  if (!atmCardNumber) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return atmCardNumberRegex.test(atmCardNumber)
      ? { status: true, msg: '' }
      : {
          status: false,
          msg: strings.validCardNumber,
        };
  }
};

// CVV validation
const validateCvv = cvv => {
  if (!cvv) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return cvvRegex.test(cvv)
      ? { status: true, msg: '' }
      : {
          status: false,
          msg: strings.validCvv,
        };
  }
};

//Password validation
const validatePassword = (
  pass: string,
  isConfrimPass?: boolean,
  password?: string,
) => {
  if (!pass) {
    return strings.plsEnterPassword;
  } else if (pass.length < 8) {
    return strings.validatePassword;
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password != pass) {
        return strings.confirmPassValidString;
      }
      return true;
    } else {
      return strings.validatePassword;
    }
  }
};

// confirm password validation
const validateConfirmPassword = (pass: string, password: string) => {
  if (!pass) {
    return strings.plsEnterPassword;
  } else if (pass.length < 8) {
    return strings.validatePassword;
  } else {
    if (passwordRegex.test(pass)) {
      if (password != pass) {
        return strings.confirmPassValidString;
      }
      return true;
    } else {
      return strings.validatePassword;
    }
  }
};

//Email validation
export const EmailValidation = (email: string) => {
  if (email === null || email === undefined || email === '') {
    return true;
  }
  const isValidate = emailRegex.test(email);
  return isValidate ? true : strings.validEmail;
};

//Mobile number validation
const MobileValidation = (mobile: any) => {
  if (mobile === null || mobile === undefined || mobile === '') {
    return true;
  }
  // const reg = /^[0-9]{10}$/;
  const reg = /^(\+\d{1,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const isValidate = reg.test(mobile);
  return isValidate ? true : strings.validMobile;
};

export {
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateCardNumber,
  validateCvv,
  MobileValidation,
};
