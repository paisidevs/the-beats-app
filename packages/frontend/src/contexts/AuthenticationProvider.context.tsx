import { useLocalStorage, useSessionStorage } from '@paisidevs/tra-hooks';
import React, { FC, useEffect, useState } from 'react';
import { COGNITO_USER_STORAGE_KEY } from '../constants';

type CognitoUser = {
  accessToken: string;
  attributes: {
    id: string;
    // TODO: Provide correct types
    [attribute: string]: any;
  };
};

type ContextType = {
  authenticating: boolean;
  cognitoUser: CognitoUser;
  isAuthenticated: boolean;
  forgotPassword: (email: string) => void;
  resetPassword: (
    code: string,
    password: string,
    passwordConfirmation: string,
  ) => void;
  signIn: (email: string, password: string, rememberMe: boolean) => void;
  signUp: (username: string, email: string, password: string) => void;
  signOut: () => void;
};

const DEFAULT_STATE = {
  authenticating: true,
  isAuthenticated: false,
  cognitoUser: {} as CognitoUser,
  forgotPassword: (_email: string) => {},
  resetPassword: (
    _code: string,
    _password: string,
    _passwordConfirmation: string,
  ) => {},
  signIn: (_email: string, _password: string, _rememberMe: boolean) => {},
  signUp: (_username: string, _email: string, _password: string) => {},
  signOut: () => {},
};

export const Context = React.createContext<ContextType>(DEFAULT_STATE);

const Provider: FC = ({ children }) => {
  const [localUser] = useLocalStorage(COGNITO_USER_STORAGE_KEY);
  const [sessionUser] = useSessionStorage(COGNITO_USER_STORAGE_KEY);
  const [cognitoUser] = useState(sessionUser || localUser);

  const [authenticating, setAuthenticating] = useState(
    DEFAULT_STATE.authenticating,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    DEFAULT_STATE.isAuthenticated,
  );

  const forgotPassword = async (email: string) => {
    try {
      // Logic goes here
    } catch (error) {
      // Error handling goes here
    }
  };

  const resetPassword = async (
    code: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    try {
      // Logic goes here

      setIsAuthenticated(true);
    } catch (error) {
      // Error handling goes here
    }
  };

  const signIn = async (
    username: string,
    password: string,
    rememberMe: boolean = false,
  ) => {
    try {
      setAuthenticating(true);

      // Logic goes here

      setIsAuthenticated(true);
    } catch (error) {
      // Error handling goes here
    } finally {
      setAuthenticating(false);
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      // Logic goes here

      setIsAuthenticated(true);
    } catch (error) {
      // Error handling goes here
    }
  };

  const signOut = () => {
    // clearLocalUser();
    // clearSessionUser();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (cognitoUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setAuthenticating(false);
  }, [cognitoUser]);

  return (
    <Context.Provider
      value={{
        authenticating,
        cognitoUser,
        forgotPassword,
        isAuthenticated,
        resetPassword,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
