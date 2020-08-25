import {
  ApolloClient,
  errorLink,
  from,
  HttpLink,
  InMemoryCache,
  loggerLink,
  RetryLink,
  setContext,
} from "@paisidevs/tra-apollo";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage } from "apollo-cache-persist/types";
import { GRAPHQL_ENDPOINT, NODE_ENV } from "./constants";
import introspectionResult from "./fragment-matcher";
import { getCognitoUserToken } from "./utilities";

const cache = new InMemoryCache({
  possibleTypes: introspectionResult.possibleTypes,
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from (local/session) storage if it exists
  const token = getCognitoUserToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Comment
const retryLink = new RetryLink();

let clientLink = from([retryLink, authLink, httpLink]);

if (NODE_ENV === "development") {
  clientLink = from([loggerLink, errorLink, clientLink]);
}

export const client = new ApolloClient({
  cache,
  link: clientLink,
});

export const persistedClient = async () => {
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<string | null>,
  });

  return client;
};
