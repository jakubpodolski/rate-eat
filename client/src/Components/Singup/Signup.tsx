import React, {FC, useState} from 'react';
import './Signup.css'

type Signup = {
  handleSignup: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    login: string,
    pass: string
  ) => void;
}

export const Signup: FC<Signup> = ({
  handleSignup
}) => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="signup">
      <h2 className="signup__title">
          Create an account
      </h2>
      <form className="signup__form" onSubmit={(e) => handleSignup(e, email, login, pass)}>
        <label className="login__inputTitle" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="signup__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login__inputTitle" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          className="signup__input"
          value={login} 
          onChange={(e) => setLogin(e.target.value)}
        />
        <label className="login__inputTitle" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="signup__input"
          value={pass} 
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="signup__button">
          <input className="button--primary" type="submit" value="Create account" />
        </div>
      </form>
    </div>
  );
};