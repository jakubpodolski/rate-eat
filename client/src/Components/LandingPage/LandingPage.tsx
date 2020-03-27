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
            displaySignup: false,
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
                    <>
                        <Signup handleSignup={this.handleSignup}/>
                        <button className="landingPage__changeForm" onClick={() => this.setState({ displaySignup: false})}>
                            Have an account? Sign in insted
                        </button>
                    </>
                ) : (
                    <>
                        <Login handleLogin={this.handleLogin}/>
                        <button className="landingPage__changeForm" onClick={() => this.setState({ displaySignup: true})}>
                            No account? Sign up!
                        </button>
                    </>
                )}                
            </section>
        );
    }
}