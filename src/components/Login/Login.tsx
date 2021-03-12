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
      //   const { user } = userCredential;
    } catch (err) {
      console.log(err);
    }
  };

  const logOutHandler = () => {
    auth.signOut();
  };

  return (
    <div>
      <form>
        <span>email</span>
        <input
          type="email"
          id="username"
          name="name"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>password</span>
        <input
          type="password"
          id="password"
          name="name"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={loginHandler}>
          Log in
        </button>
      </form>
      <button type="button" onClick={logOutHandler}>
        LogOut
      </button>
    </div>
  );
}
