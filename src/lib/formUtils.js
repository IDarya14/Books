export const UPDATE_FORM = 'UPDATE_FORM';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';

export const onInputChange = (
  name,
  value,
  dispatch,
  formState,
  passwordConfirm
) => {
  const { hasError, error } = validateInput(name, value, passwordConfirm);
  let isFormValid = true;

  for (let key in formState) {
    const item = formState[key];

    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: {
      name,
      value,
      hasError,
      error,
      touched: false,
      isFormValid,
    },
  });
};

export const onFocusOut = (
  name,
  value,
  dispatch,
  formState,
  passwordConfirm
) => {
  debugger;
  const { hasError, error } = validateInput(name, value, passwordConfirm);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

export const validateInput = (name, value, passwordConfirm) => {
  let hasError = false;
  let error = '';

  switch (name) {
    case 'login':
      if (!value) {
        hasError = true;
        error = 'Name cannot be empty';
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = 'Invalid Name. Avoid Special characters';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'password':
      if (!value) {
        hasError = true;
        error = 'Password cannot be empty';
      } else if (value.trim().length < 8) {
        hasError = true;
        error = 'Password must have at least 8 characters';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'passwordConfirm':
      if (!value) {
        hasError = true;
        error = 'Password cannot be empty';
      } else if (value.trim().length < 8) {
        hasError = true;
        error = 'Password must have at least 8 characters';
      } else if (value !== passwordConfirm) {
        hasError = true;
        error = 'password must be the same';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'date':
      const currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
      const myAge = ~~((Date.now(currentDate) - value) / 31557600000);
      if (!value) {
        hasError = true;
        error = 'Date cannot be empty';
      } else if (myAge < 18) {
        hasError = true;
        error = 'You must be older';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'email':
      if (!value) {
        hasError = true;
        error = 'Email cannot be empty';
      } else if (
        !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        )
      ) {
        hasError = true;
        error = 'Invalid Email';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'webSite':
      if (!value) {
        hasError = true;
        error = 'web-site cannot be empty';
      } else if (
        /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(
          value
        )
      ) {
        hasError = true;
        error = 'Invalid URL';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'mobile':
      if (!value) {
        hasError = true;
        error = 'Invalid phone number';
      } else if (!isPossiblePhoneNumber(value) || !isValidPhoneNumber(value)) {
        hasError = true;
        error = 'Invalid phone number';
      }
      break;
    case 'terms':
      if (!value) {
        hasError = true;
        error = 'You must accept terms and conditions';
      } else {
        hasError = false;
        error = '';
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
