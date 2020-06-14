import React from 'react';

import FightCardFighter from '../FightCard/FightCardFighter';

import './UserBidCardHeader.scss';
import FightCardVs from '../FightCard/FightCardVs';

const UserBidCardHeader = ({
	fighter1,
	fighter2,
	handleClick,
	fightNumber,
	selectedFighter,
	editBidsMode
}) => {
	return (
		<div className='user-bid-card__header'>
			<FightCardFighter
				image={fighter1.image}
				name={fighter1.name}
				moneyLine={fighter1.moneyLine}
				handleClick={handleClick}
				fightNumber={fightNumber}
				selectedFighter={selectedFighter}
				bidsCard={true}
				editBidsMode={editBidsMode}
			/>
			<FightCardVs />
			<FightCardFighter
				image={fighter2.image}
				name={fighter2.name}
				moneyLine={fighter2.moneyLine}
				handleClick={handleClick}
				fightNumber={fightNumber}
				selectedFighter={selectedFighter}
				bidsCard={true}
				editBidsMode={editBidsMode}
			/>
		</div>
	);
};

export default UserBidCardHeader;
