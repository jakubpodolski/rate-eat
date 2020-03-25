import React, {FC} from 'react';
import PropTypes from 'prop-types';
import './Login.css'

type Login = {
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Login: FC<Login> = ({
    handleLogin
}) => (
    <form className="login" onSubmit={(e) => handleLogin(e)}>
        <input className="login__input" type="text"></input>
        <input className="login__input" type="text"></input>
        <input className="login__button" type="button"></input>
    </form>
);

Login.propTypes = { 
    handleLogin: PropTypes.func.isRequired
}