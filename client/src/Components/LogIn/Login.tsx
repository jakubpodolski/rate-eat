import React, {FC, useState} from 'react';
import './Login.css'

type Login = {
    handleLogin: (
        e: React.FormEvent<HTMLFormElement>,
        email: string,
        pass: string
    ) => void;
}

export const Login: FC<Login> = ({
    handleLogin
}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className="login">
            <span>
                logo
            </span>
            <h2 className="login__title">
                Sign in to RateEat
            </h2>
            <form className="login__form" onSubmit={(e) => handleLogin(e, email, pass)}>
                <label htmlFor="login">
                    Email address
                </label>
                <input
                    id="login"
                    className="login__input"
                    type="text"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    className="login__input"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input className="login__button" type="submit" value="Login" />
            </form>
        </div>
    );
};