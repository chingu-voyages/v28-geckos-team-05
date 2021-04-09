/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
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

        <button
          disabled={loading}
          className="login__button"
          type="submit"
          onClick={loginHandler}
        >
          {loading ? <span>Logging in ...</span> : <span>Log in</span>}
        </button>
        <div className="login__singup-text">
          <span>Don't have account?</span>
          <Link to="/signup">
            <span className="login__singup-text__link">Sign In</span>
          </Link>
        </div>
      </form>
      {error && <div className="login__error">{error}</div>}
    </>
  );
}
