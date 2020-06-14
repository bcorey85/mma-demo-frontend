import React from 'react';

import PointDisplay from '../shared/PointDisplay';

const FightCardBids = ({ bids, key }) => {
	const setOutcomeClass = bidOutcome => {
		if (bidOutcome !== null) {
			if (bidOutcome.toUpperCase() === 'W') {
				return 'u-text--win';
			} else if (bidOutcome.toUpperCase() === 'L') {
				return 'u-text--lose';
			} else {
				return '';
			}
		}
	};
	if (bids) {
		return (
			<div className='fight-card__body-bids'>
				{bids.map((bid, i) => {
					return (
						<PointDisplay
							fightName={bid.user.fightName}
							lastName={bid.user.lastName}
							bid={bid.bid}
							points={bid.points}
							outcomeClass={setOutcomeClass(bid.outcome)}
							key={`${key} ${i}`}
							showBid
						/>
					);
				})}
			</div>
		);
	}
};

export default FightCardBids;
