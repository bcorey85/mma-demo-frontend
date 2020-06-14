import React from 'react';

import './FightName.scss';

const FightName = ({ fightName, lastName, large }) => {
	return (
		<div className={`fight-name ${large ? 'fight-name--large' : ''}`}>
			<div>{fightName}</div>
			<div>{lastName}</div>
		</div>
	);
};

export default FightName;
