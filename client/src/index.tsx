import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {Login} from './Components/LogIn/Login'
import "./index.css"

const App: FC = () => {
  return <div className="app">
    <Login handleLogin={(e) => console.log('dip')}/>
  </div>
};

ReactDOM.render(<App />, document.getElementById('root'));