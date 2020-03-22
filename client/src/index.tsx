import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import "./styles.css"

const App: FC = () => {
  return <h1 className="head">
    Hello Wepack!
    <span className="subtitle">
      I also have styles
    </span>
  </h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));