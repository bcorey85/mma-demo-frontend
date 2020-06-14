import React from 'react';

import FightCardFighter from './FightCardFighter';
import FightCardVs from './FightCardVs';

import './FightCardHeader.scss';

const FightCardHeader = ({ fighter1, fighter2, bidsCard }) => {
	const fighter1Outcome = fighter1.outcome.toUpperCase();
	const fighter2Outcome = fighter2.outcome.toUpperCase();

	const setBorder = fighterOutcome => {
		if (fighterOutcome === 'W') {
			return 'u-border--win';
		} else if (fighterOutcome === 'L') {
			return 'u-border--lose';
		} else {
			return '';
		}
	};

	return (
		<div className='fight-card__header'>
			<FightCardFighter
				image={fighter1.image}
				name={fighter1.name}
				moneyLine={fighter1.moneyLine}
				outcome={fighter1Outcome}
				border={setBorder(fighter1Outcome)}
				bidsCard={bidsCard}
			/>
			<FightCardVs />
			<FightCardFighter
				image={fighter2.image}
				name={fighter2.name}
				moneyLine={fighter2.moneyLine}
				outcome={fighter2Outcome}
				border={setBorder(fighter2Outcome)}
				bidsCard={bidsCard}
			/>
		</div>
	);
};

export default FightCardHeader;
