import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './App';

const cache = new InMemoryCache();
const defaults = {
	selectedSite: {
	  __typename: 'SelectedSite',
	  siteCode: "",
	}
};
const stateLink = withClientState({
	cache,
	resolvers: {
	  Mutation: {
			updateSelectedSite: (_, { siteCode }, { cache }) => {
				const data = {
					selectedSite: {
						__typename: 'SelectedSite',
						siteCode
					}
				};

				cache.writeData({ data });
				return null;
			},
		},
	},
	defaults
  });

const client = new ApolloClient({
  uri: 'https://apollo-server-azure-functions-tutorial.azurewebsites.net/api/graphql',
	link: ApolloLink.from([
		stateLink, 
		new ApolloLink((operation, forward) => {
			operation.extensions.clientInfo = {
			  clientName: 'usgs-react-web',
			  clientVersion: '1',
			};
			operation.setContext({
			  http: {
				includeExtensions: true,
			  },
			});
	  
			return forward(operation);
		  }),
		new HttpLink({uri: 'https://apollo-server-azure-functions-tutorial.azurewebsites.net/api/graphql'})]),
    cache: cache,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
