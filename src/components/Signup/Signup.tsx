/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import './Signup.scss';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>('');
  const [error, setError] = useState<string>('');

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmed) {
      setError('passwords does not match');
      return;
    }
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="signup__form-container" onSubmit={signUpHandler}>
      {error && <div className="signup__error-container">{error}</div>}
      <div className="signup__input-container">
        <label htmlFor="username">email: </label>
        <input
          className="signup__input"
          type="email"
          id="username"
          name="username"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="signup__input-container">
        <label htmlFor="username">password: </label>
        <input
          className="signup__input"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="signup__input-container">
        <label htmlFor="username">confirm password: </label>
        <input
          className="signup__input"
          type="password"
          id="passwordConfirmed"
          name="passwordConfirmed"
          required
          onChange={(e) => setPasswordConfirmed(e.target.value)}
        />
      </div>
      <button className="login__button" type="submit">
        Sign Up
      </button>
    </form>
  );
}
