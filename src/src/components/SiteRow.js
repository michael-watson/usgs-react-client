import React from 'react';

const SiteRow = ({ site, onClick }) => (
  <div id="container" className="verticalFlex" onClick={onClick}>
		<h4>{site.name}</h4>
		<p>Site Code: {site.siteCode}</p>
	</div>
);

export default SiteRow;