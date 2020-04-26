import { COGNITO_USER_STORAGE_KEY } from '../constants';

/**
 * Gets JWT of authenticatedUser from either sessionStorage or localStorage
 */
export const getCognitoUserToken = () => {
  const localUser = localStorage.getItem(COGNITO_USER_STORAGE_KEY);
  const sessionUser = sessionStorage.getItem(COGNITO_USER_STORAGE_KEY);
  const cognitoUser = sessionUser || localUser;

  return cognitoUser ? JSON.parse(cognitoUser).accessToken : null;
};
