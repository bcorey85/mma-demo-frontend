import React from 'react';

import './EventMeta.scss';

const EventMeta = ({ eventName, date, cardNumber, seasonNumber }) => {
	return (
		<div className='event-meta'>
			<h5>
				Season {seasonNumber} - Card {cardNumber}
			</h5>
			<h2>{eventName}</h2>
			<h3>{date}</h3>
		</div>
	);
};

export default EventMeta;
