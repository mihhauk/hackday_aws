import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from 'aws-amplify';
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import appSyncConfig from "./aws-exports";
import UserInfo from './components/UserInfo'

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    jwtToken: async () => {
      return (await Auth.currentSession()).getAccessToken().getJwtToken();
    }
  },
  // cacheOptions: {
  //   dataIdFromObject: (obj) => {
  //     let id = defaultDataIdFromObject(obj);

  //     if (!id) {
  //       const { __typename: typename } = obj;
  //       switch (typename) {
  //         case 'Comment':
  //           return `${typename}:${obj.commentId}`;
  //         default:
  //           return id;
  //       }
  //     }

  //     return id;
  //   }
  // }
});


class App extends Component {

  state = { user: null }

  render() {
    return (
      <div className="App">
        <UserInfo />
      </div>
    );
  }
}

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
