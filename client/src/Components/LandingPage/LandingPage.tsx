import React, { Component } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import {Login} from '../LogIn/Login';
import {Signup} from '../Singup/Signup';
import {Popup} from '../Popup/Popup';
import {Spinner} from '../Spinner/Spinner';

import {API_URL, APP_NAME, setInStorage} from '../helpers';

import './LandingPage.css'

type LandingPageState = {
  loading: boolean,
  displaySignup: boolean;
  displayServerResponse: boolean;
  serverResponse: {
    success?: boolean,
    message?: string,
  };
  loginResponse: {
    success?: boolean,
    message?: string,
  };
}

export class LandingPage extends Component<RouteComponentProps, LandingPageState> {
  constructor(props: any) {
    super(props)

    this.state = {
      loading: false,
      displaySignup: false,
      displayServerResponse: false,
      serverResponse: {},
      loginResponse: {},
    }
  }

  flushServerRespons = () => {
    this.setState({
      displayServerResponse: false,
      serverResponse: {}
    })
  }

  handleLogin = async (e: React.FormEvent<HTMLFormElement>, email: string, pass: string) => {
    e.preventDefault();
    this.flushServerRespons()
    const signinUser = fetch(`${API_URL}account/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    })

    this.setState({loading: true})
    await signinUser.then(res => res.json())
      .then(res => {
        if (res.success) {
          setInStorage(APP_NAME, { token: res.token})
          this.setState({
            loading: false,
            serverResponse: res,
            displayServerResponse: true
          })
          // Move to HomePage
          navigate('home')
        }
        else {
          this.setState({
            loading: false,
            serverResponse: res,
            displayServerResponse: true
          })
        }
      })
  }

  handleSignup = async (e: React.FormEvent<HTMLFormElement>, email: string, login: string, pass: string) => {
    e.preventDefault();
    this.flushServerRespons()
    const createUser = fetch(`${API_URL}account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        login: login,
        password: pass
      })
    })

    this.setState({loading: true})
    await createUser.then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          serverResponse: res,
          displayServerResponse: true
        })
      })
  }

  render() {
    return (
      <section className="landingPage">
        {this.state.loading && <Spinner />}
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
        {this.state.displayServerResponse && <Popup data={this.state.serverResponse}/>}
      </section>
    );
  }
}