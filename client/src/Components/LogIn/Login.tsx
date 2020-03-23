import React, {FC} from 'react';

type Login = {
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
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