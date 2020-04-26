import React from 'react';
import { Context } from '../contexts/AuthenticationProvider.context';

export const useAuthentication = () => {
  const context = React.useContext(Context);

  if (context === undefined) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider',
    );
  }

  return context;
};
