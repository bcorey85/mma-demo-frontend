import React from 'react';

import './FightCardTitle.scss';

const FightCardTitle = ({ fightNumber }) => {
	return <h2 className='fight-card__title'>Fight {fightNumber}</h2>;
};

export default FightCardTitle;
