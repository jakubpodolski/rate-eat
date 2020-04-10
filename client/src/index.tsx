import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router, navigate } from '@reach/router';
import { LandingPage } from './Components/LandingPage/LandingPage';
import { Layout } from './Components/Layout/Layout';
import { HomePage } from './Components/HomePage/HomePage';
import { 
  APP_NAME,
  getFromStorage,
  verifyUser,
} from './Components/helpers';

import "./Static/mixins/headers.css"
import "./index.css"

const App: FC = () => {

  useEffect( () => {
    const obj = getFromStorage(APP_NAME);
    if (obj && obj.token) {
      const { token } = obj;
      verifyUser(token).then((res: Boolean) => {
        if(res) navigate('home')
        else navigate('/')
      })
    }
  }, [])


  return (
    <article>
      <Router>
        <LandingPage path="/" />
        <Layout path="/home" >
          <HomePage path="/" />
        </Layout>
      </Router>
    </article>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));