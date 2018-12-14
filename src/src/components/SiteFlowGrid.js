import React, { Component } from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

import SiteRow from './SiteRow';
import FlowsList from './FlowsList';

const GET_SITES = gql`
	query GetAllSites {
    	sites(stateCode:"CA"){
      		name
      		siteCode
    	}
  	}
`;

export default class SiteFlowGrid extends Component {
	constructor(props) {
		super(props);
		this.state = { siteCode: 'default' };
	}

	render = () => {
		const { state } = this;
		return (
			<Query query={GET_SITES}>
				{({ loading, error, data, fetchMore }) => {
					if (loading) return 'Loading...';
					if (error) return `${error}`;
					
					return (
						<div id="dataContainer">
							<div id="leftColumn">
								{data.sites.map((site) => (
									<SiteRow key={site.siteCode}
										site={site}
										onClick={() => {
											this.updateSelectedSite(site.siteCode);
										}}
									/>
								))}
							</div>
							<div id="rightColumn">
								<FlowsList sharedValue={state.siteCode} />
							</div>
						</div>
					);
				}}
			</Query>
		);
	};

	updateSelectedSite(newSite) {
		this.setState({ siteCode: newSite });
	}
}