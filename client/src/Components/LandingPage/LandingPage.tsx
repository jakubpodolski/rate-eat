import React, { Component } from 'react';
import {Login} from '../LogIn/Login';
import {Signup} from '../Singup/Signup';
import {API_URL} from '../helpers';


import './LandingPage.css'

type LandingPageState = {
    displaySignup: boolean
    signupResponse: {}
}

export class LandingPage extends Component<{}, LandingPageState> {
    constructor(props: any) {
        super(props)

        this.state = {
            displaySignup: true,
            signupResponse: {}
        }
    }

    handleLogin (e: React.FormEvent<HTMLFormElement>, email: string, pass: string) {
        e.preventDefault();
        // fetch(API_URL)
    }

    async handleSignup (e: React.FormEvent<HTMLFormElement>, email: string, login: string, pass: string) {
        e.preventDefault();
        const createUser = fetch(`${API_URL}account/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                login,
                pass
            })
        })

        await createUser.then(res => console.log(res))
    }

    render() {
        return (
            <section className="landingPage">
                {this.state.displaySignup ? (
                        <Signup handleSignup={this.handleSignup}/>
                ) : (
                        <Login handleLogin={this.handleLogin}/>
                )}
                <div className="landingPage__changeForm">
                    <button
                        className="button--secondary"
                        onClick={() => this.setState({ displaySignup: !this.state.displaySignup})}
                    >
                        {this.state.displaySignup ? 'Have an account? Sign in insted' : 'No account? Sign up!'}
                    </button>
                </div>
            </section>
        );
    }
}