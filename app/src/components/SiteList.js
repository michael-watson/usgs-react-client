import React, { Component } from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

import SiteRow from './SiteRow';

const GET_SITES = gql`
  query GetAllSites {
    sites(stateCode:"CA"){
      name
      siteCode
    }
  }
`;

export default class SitesList extends Component {
  render () {
    return (
      <Query query={GET_SITES}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return 'Loading...';
          if (error) return `${error}`;
          
          return (
            <div>
              {(data.sites).map(site => (
                <SiteRow siteName={site.name} siteCode={site.siteCode}/>
              ))}
            </div>
          );
        }}
      </Query>
    );
  };
}