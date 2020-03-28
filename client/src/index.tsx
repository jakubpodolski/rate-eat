import React, {FC, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {LandingPage} from './Components/LandingPage/LandingPage';
import {HomePage} from './Components/HomePage/HomePage';
import {API_URL, APP_NAME, getFromStorage} from './Components/helpers';
import "./index.css"
import "./Static/mixins/headers.css"

const App: FC = () => {
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    const obj = getFromStorage(APP_NAME);
    if (obj && obj.token) {
      const { token } = obj;

      fetch(`${API_URL}account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if (json.success) {
            setLogedIn(true)
          }
        });
    }
  }, [])

  return (
    <article className="app">
      {logedIn 
        ? <HomePage moveToLandingPage={setLogedIn}/>
        : <LandingPage moveToLandingPage={setLogedIn}/>}
    </article>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));