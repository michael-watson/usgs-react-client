import React from 'react';
import moment from 'moment';

const FlowRow = ({ flow }) => (
	<div id="container" key={flow.id}>
		<p>
			{flow.flowValue} {flow.flowUnitCode}
		</p>
		<p>{getDateString(flow)}</p>
	</div>
);

export default FlowRow;

function getDateString(flow) {
	var measuredMoment = new moment(flow.dateMeasured).format('h:mm, MM/DD');
	if (measuredMoment === 'Invalid date') {
		var d = new Date(Date.now()),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [ month, day, year ].join('-');
	}

	return measuredMoment;
}