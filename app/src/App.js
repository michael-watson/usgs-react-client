import React, { Component } from 'react';

import './App.css';
import logo from './logo.svg';
import SiteFlowGrid from './components/SiteFlowGrid';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">California Gauge Sites</h1>
				</header>
				<SiteFlowGrid/>
			</div>
		);
	}
}

export default App;