import React, { FC } from 'react';

import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          Copyright &copy;&nbsp;
          <a
            className="footer__link"
            href="https://github.com/jakubpodolski"
          >
             Jakub Podolski
          </a>
        </p>
      </div>
    </footer>
  )
}