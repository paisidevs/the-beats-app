import React, { FC } from 'react';
import AuthenticationProvider from './AuthenticationProvider.context';

export const AppProvider: FC = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
