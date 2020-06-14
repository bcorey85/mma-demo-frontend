import React from 'react';

import UserStatBlock from './UserStatBlock';

import './UserBidSummary.scss';

const UserBidSummary = ({
	bids,
	bidsRemaining,
	pointsAvailable,
	pointsSpent,
	isError,
	estimatedWinnings
}) => {
	const filteredBidsArray = bids.filter(
		bid => bid.bid !== null && bid.fighter !== null
	);
	return (
		<div className='user-bid-summary'>
			<h2 className='user-bid-summary__title'>Bid Summary</h2>
			<div className='user-bid-summary__stats'>
				<UserStatBlock
					heading='Bids Remaining'
					value={bidsRemaining}
					isError={isError.bidsRemainingError}
				/>

				<UserStatBlock
					heading='Points Available'
					value={pointsAvailable}
					isError={isError.pointsAvailableError}
				/>
				<UserStatBlock heading='Points Spent' value={pointsSpent} />
			</div>
			<div className='user-bid-summary__bid-heading'>
				<div>Fighter Selected</div>
				<div>Bid</div>
			</div>
			{filteredBidsArray.map((bid, index) => (
				<div className='user-bid-summary__bid' key={`bid ${index + 1}`}>
					<div>{bid.fighter}</div>
					<div>{bid.bid}</div>
				</div>
			))}
			<div className='user-bid-summary__winnings'>
				<div>
					<strong>Estimated Winnings Total</strong>
				</div>
				<div>+{estimatedWinnings}</div>
			</div>
		</div>
	);
};

export default UserBidSummary;
