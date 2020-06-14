import React from 'react';

import FightCardHeader from './FightCardHeader';
import FightCardTitle from './FightCardTitle';
import FightCardBody from './FightCardBody';

import './FightCard.scss';

const Card = ({
	fightNumber,
	fighter1,
	fighter2,
	f1Bids,
	f2Bids,
	showBids
}) => {
	return (
		<div className='fight-card'>
			<FightCardTitle fightNumber={fightNumber} />
			<FightCardHeader fighter1={fighter1} fighter2={fighter2} />
			<FightCardBody
				f1Bids={f1Bids}
				f2Bids={f2Bids}
				id={fightNumber}
				showBids={showBids}
			/>
		</div>
	);
};

export default Card;
