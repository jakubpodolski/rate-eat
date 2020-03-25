import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {LandingPage} from './Components/LandingPage/LandingPage';
import "./index.css"

const App: FC = () => {
  return (
    <article className="app">
      <LandingPage />
    </article>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));