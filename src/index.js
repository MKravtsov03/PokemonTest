import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";


const pokemonsLink = "https://graphql-pokemon.now.sh";
const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: pokemonsLink
});

const client = new ApolloClient({
  link: httpLink,
  cache
});
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
