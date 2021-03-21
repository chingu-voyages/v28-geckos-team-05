/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Signup.scss';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>('');

  const signUpHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmed) {
      console.log('passwords does not match');
      return;
    }
    console.log('sign up');
  };

  return (
    <form className="signup__form-container" onSubmit={signUpHandler}>
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
