import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@paisidevs/tra-apollo";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";
import { client, persistedClient } from "./apollo.config";
import App from "./containers/App";
import { AppProvider } from "./contexts";
import * as serviceWorker from "./serviceWorker";

const renderApp = (client: ApolloClient<NormalizedCacheObject>) =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
    </ApolloProvider>,
    document.getElementById("root")
  );

persistedClient()
  .then((client) => renderApp(client))
  .catch(() => renderApp(client));

// Persist "debug" package's enable state in localStorage
if (process.env.NODE_ENV !== "production") {
  window.localStorage.setItem("debug", "tra:*");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
