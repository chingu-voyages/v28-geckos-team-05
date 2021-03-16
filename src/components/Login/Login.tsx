/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { auth } from '../../firebase';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <form className="login__form-container">
      <div className="login__input-container">
        <label htmlFor="username">email: </label>
        <input
          className="login__input"
          type="email"
          id="username"
          name="username"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login__button" type="submit" onClick={loginHandler}>
        Log in
      </button>
    </form>
  );
}
