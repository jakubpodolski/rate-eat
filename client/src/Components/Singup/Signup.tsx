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
        <form className="signup" onSubmit={(e) => handleSignup(e, email, login, pass)}>
            <input
                className="signup__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="signup__input"
                value={login} 
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                className="signup__input"
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
            />
            <input className="signup__button" type="submit" value="Create account" />
        </form>
    );
};