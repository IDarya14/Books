import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  onFocusOut,
  onInputChange,
  UPDATE_FORM,
  validateInput,
} from '../lib/formUtils';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Registry.scss';

const initState = {
  login: { value: '', touched: false, hasError: true, error: '' },
  password: { value: '', touched: false, hasError: true, error: '' },
  passwordConfirm: { value: '', touched: false, hasError: true, error: '' },
  date: { value: new Date(), touched: false, hasError: true, error: '' },
  mobile: { value: '', touched: false, hasError: true, error: '' },
  webSite: { value: '', touched: false, hasError: true, error: '' },
  email: { value: '', touched: false, hasError: true, error: '' },
  terms: { value: '', touched: false, hasError: true, error: '' },
  isFormValide: false,
};

const regFormReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
  }
};

export const Registry = () => {
  const [regFormState, dispatch] = useReducer(regFormReducer, initState);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  console.table(regFormState.mobile);

  const formSubmitHendler = (e) => {
    e.preventDefault();
    let isFormValid = true;

    for (const name in regFormState) {
      const item = regFormState[name];
      const { value } = item;
      const { hasError, error } = validateInput(name, value);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
      if (!isFormValid) {
        setShowError(true);
      } else {
        navigate('/books?page=1');
      }
    }
  };

  return (
    <div className="form-registry">
      <div className="title">Registration</div>
      {showError && !regFormState.isFormValid && (
        <div className="form_error">Please fill all the fields correctly</div>
      )}
      <form onSubmit={(e) => formSubmitHendler(e)}>
        <div className="form__item">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            name="login"
            value={regFormState.login.value}
            onChange={(e) =>
              onInputChange('login', e.target.value, dispatch, regFormState)
            }
            onBlur={(e) =>
              onFocusOut('login', e.target.value, dispatch, regFormState)
            }
          />
          {regFormState.login.touched && regFormState.login.hasError && (
            <div className="error">{regFormState.login.error}</div>
          )}
        </div>
        <div className="form__item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) =>
              onInputChange('password', e.target.value, dispatch, regFormState)
            }
            onBlur={(e) =>
              onFocusOut('password', e.target.value, dispatch, regFormState)
            }
          />

          {regFormState.password.touched && regFormState.password.hasError && (
            <div className="error">{regFormState.password.error}</div>
          )}
        </div>
        <div className="form__item">
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            onChange={(e) =>
              onInputChange(
                'passwordConfirm',
                e.target.value,
                dispatch,
                regFormState,
                regFormState.password.value
              )
            }
            onBlur={(e) =>
              onFocusOut(
                'passwordConfirm',
                e.target.value,
                dispatch,
                regFormState,
                regFormState.password.value
              )
            }
          />

          {regFormState.passwordConfirm.touched &&
            regFormState.passwordConfirm.hasError && (
              <div className="error">{regFormState.passwordConfirm.error}</div>
            )}
        </div>
        <div className="form__item">
          <label htmlFor="date">Date:</label>
          <DatePicker
            selected={regFormState.date.value}
            onCalendarClose={() =>
              onFocusOut(
                'date',
                regFormState.date.value,
                dispatch,
                regFormState
              )
            }
            onChange={(selected) =>
              onInputChange('date', selected, dispatch, regFormState)
            }
          />
          {regFormState.date.touched && regFormState.date.hasError && (
            <div className="error"> {regFormState.date.error}</div>
          )}
        </div>
        <div className="form__item">
          <label htmlFor="tel">Mobile:</label>
          <PhoneInput
            maxLength={18}
            defaultCountry="UA"
            international
            value={regFormState.mobile.value}
            onChange={(value) => {
              onInputChange('mobile', value, dispatch, regFormState);
            }}
            type="tel"
            onBlur={(e) => {
              onFocusOut('mobile', e.target.value, dispatch, regFormState);
            }}
          />

          {regFormState.mobile.touched && regFormState.mobile.hasError && (
            <div className="error">{regFormState.mobile.error}</div>
          )}
        </div>
        <div className="form__item">
          <label htmlFor="text">Web-site:</label>
          <input
            value={regFormState.webSite.value}
            type="text"
            onChange={(e) => {
              onInputChange('webSite', e.target.value, dispatch, regFormState);
            }}
            onBlur={(e) => {
              onFocusOut('webSite', e.target.value, dispatch, regFormState);
            }}
          />

          {regFormState.webSite.touched && regFormState.webSite.hasError && (
            <div className="error">{regFormState.webSite.error}</div>
          )}
        </div>
        <div className="form__item">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            onChange={(e) => {
              onInputChange('email', e.target.value, dispatch, regFormState);
            }}
            onBlur={(e) => {
              onFocusOut('email', e.target.value, dispatch, regFormState);
            }}
          />
          {regFormState.email.touched && regFormState.email.hasError && (
            <div className="error">{regFormState.email.error}</div>
          )}
        </div>
        <div className="form__item">
          <label className="toc">
            <input
              type="checkbox"
              name="terms"
              checked={regFormState.terms.value}
              onChange={(e) =>
                onFocusOut('terms', e.target.checked, dispatch, regFormState)
              }
            />
            Accept terms and conditions
          </label>
          {regFormState.terms.touched && regFormState.terms.hasError && (
            <div className="error">{regFormState.terms.error}</div>
          )}
        </div>
        <div className="form__item">
          <input className="submit_btn" type="submit" value="Submite" />
        </div>
      </form>
    </div>
  );
};
