import React, { Component } from 'react';
import {Login} from '../LogIn/Login';

import './LandingPage.css'

type LandingPageState = {
    displaySignup: boolean
}

export class LandingPage extends Component<{}, LandingPageState> {
    constructor(props: any) {
        super(props)

        this.state = {
            displaySignup: false
        }
    }

    handleLogin (e: React.FormEvent<HTMLFormElement>, email: string, pass: string) {
        e.preventDefault();
        console.log(email, pass)
    }

    render() {
        return (
            <section className="landingPage">
                <Login handleLogin={this.handleLogin}/>

                {this.state.displaySignup ? (
                    <button className="landingPage__changeForm" onClick={() => this.setState({ displaySignup: false})}>
                        Have an account? Sign in insted
                    </button>
                ) : (
                    <button className="landingPage__changeForm" onClick={() => this.setState({ displaySignup: true})}>
                        No account? Sign up!
                    </button>
                )}                
            </section>
        );
    }
}