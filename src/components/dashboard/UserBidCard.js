import React from 'react';

import UserBidCardHeader from './UserBidCardHeader';

import './UserBidCard.scss';
import FightCardTitle from '../FightCard/FightCardTitle';

const UserBidCard = ({
	fighter1,
	fighter2,
	fightNumber,
	handleBidChange,
	bidState,
	editBidsMode,
	existingBids,
	selectedFighter,
	estimatedWinnings
}) => {
	let disabledState;
	if (editBidsMode === true) {
		disabledState = false;
	} else if (existingBids === false) {
		disabledState = false;
	} else {
		disabledState = true;
	}

	return (
		<div className='user-bid-card'>
			<FightCardTitle fightNumber={fightNumber} />
			<UserBidCardHeader
				fighter1={fighter1}
				fighter2={fighter2}
				fightNumber={fightNumber}
				handleClick={handleBidChange}
				selectedFighter={selectedFighter}
				editBidsMode={editBidsMode}
			/>
			<div>
				<label htmlFor={`${fightNumber}-fighter`}>Fighter</label>
				<select
					id={`${fightNumber}-fighter`}
					data-fight-number={fightNumber}
					value={bidState.fighter || ''}
					onChange={handleBidChange}
					disabled={disabledState}>
					<option value='' />
					<option>{fighter1.name}</option>
					<option>{fighter2.name}</option>
				</select>
			</div>
			<div>
				<label htmlFor={`${fightNumber}-bid`}>Bid Amount</label>
				<input
					type='number'
					id={`${fightNumber}-bid`}
					data-fight-number={fightNumber}
					value={bidState.bid || ''}
					min='0'
					max='100000'
					onChange={handleBidChange}
					disabled={disabledState}
				/>
			</div>
			<div className='user-bid-card__winnings'>
				<p>Estimated Winnings</p>
				<p>+{estimatedWinnings || 0}</p>
			</div>
		</div>
	);
};

export default UserBidCard;
