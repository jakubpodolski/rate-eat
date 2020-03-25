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
        <form className="login" onSubmit={(e) => handleLogin(e, email, pass)}>
            <input
                className="login__input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="login__input"
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
            />
            <input className="login__button" type="submit" value="Login" />
        </form>
    );
};