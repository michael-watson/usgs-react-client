import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FlowRow from './FlowRow';

const GET_SITE_FLOW = gql`
  query GetSitesFlow($siteCode: String!){ 
    site(siteCode: $siteCode){
      flows(days:7){
        flowValue
        flowUnitCode
        dateMeasured
      }
    }
  }
`;

export default class FlowsList extends Component {
  render = () => {
    const { sharedValue } = this.props;
    return (
      <Query query={GET_SITE_FLOW} variables={{siteCode: sharedValue}}>
        {({ loading, error, data, fetchMore }) => {
          if(sharedValue === 'default') return(<div/>);
          if (loading) return 'Loading...';
          if (error) return `${error}`;
          
          return (
            <div>
            <p>Flows in last week</p>
              {(data.site.flows).map(flowValue => (
                <FlowRow flow={flowValue} key={flowValue.id}/>
              ))}
            </div>
          );
        }}
      </Query>
    );
  };
}