import React, { FC } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { RouteComponentProps } from '@reach/router';


export const Layout: FC<RouteComponentProps> = ({children}) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}