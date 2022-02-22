import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import './auth.scss';
import {
  UPDATE_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
} from '../lib/formUtils';

const initState = {
  login: { value: '', touched: false, hasError: true, error: '' },
  password: { value: '', touched: false, hasError: true, error: '' },
  terms: { value: false, touched: false, hasError: true, error: '' },
  isFormValid: false,
};

const formsReducer = (state, action) => {
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

export const Auth = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formsReducer, initState);
  const [showError, setShowError] = useState(false);

  const formSubmitHendler = (e) => {
    e.preventDefault();
    let isFormValid = true;

    for (const name in formState) {
      const item = formState[name];
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
    <div className="auth">
      <h1 className="title">Sign Up</h1>
      {showError && !formState.isFormValid && (
        <div className="form_error">Please fill all the fields correctly</div>
      )}
      <form onSubmit={(e) => formSubmitHendler(e)}>
        <div className="input_wrapper">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            name="login"
            id="login"
            value={formState.login.value}
            onChange={(e) => {
              onInputChange('login', e.target.value, dispatch, formState);
            }}
            onBlur={(e) =>
              onFocusOut('login', e.target.value, dispatch, formState)
            }
          />
          {formState.login.touched && formState.login.hasError && (
            <div className="error">{formState.login.error}</div>
          )}
        </div>
        <div className="input_wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password.value}
            onChange={(e) => {
              onInputChange('password', e.target.value, dispatch, formState);
            }}
            onBlur={(e) => {
              onFocusOut('password', e.target.value, dispatch, formState);
            }}
          />
          {formState.password.touched && formState.password.hasError && (
            <div className="error">{formState.password.error}</div>
          )}
        </div>
        <div className="input_wrapper">
          <label className="toc">
            <input
              type="checkbox"
              name="terms"
              checked={formState.terms.value}
              onChange={(e) =>
                onFocusOut('terms', e.target.checked, dispatch, formState)
              }
            />
            Accept terms and conditions
          </label>
          {formState.terms.touched && formState.terms.hasError && (
            <div className="error">{formState.terms.error}</div>
          )}
        </div>
        <div className="input_wrapper">
          <input className="submit_btn" type="submit" value="Sign Up" />
        </div>
        <div className="registry" onClick={() => navigate('/registry')}>
          Зарегистрироваться
        </div>
      </form>
    </div>
  );
};
