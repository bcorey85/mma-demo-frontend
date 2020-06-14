export const Card = (cardNumber, eventName, date, maxBids) => {
	return {
		cardNumber: cardNumber || undefined,
		eventName: eventName || undefined,
		date: date || undefined,
		maxBids: maxBids || 6,
		fights: []
	};
};

export const Fight = ({
	fightNumber,
	fighter1,
	fighter2,
	fighter1Bids,
	fighter2Bids
}) => {
	return {
		fightNumber: fightNumber || undefined,
		fighter1: {
			name: fighter1.name || '',
			image: fighter1.image || '',
			moneyLine: fighter1.moneyLine || undefined,
			outcome: fighter1.outcome || ''
		},
		fighter2: {
			name: fighter2.name || '',
			image: fighter2.image || '',
			moneyLine: fighter2.moneyLine || undefined,
			outcome: fighter2.outcome || ''
		},
		fighter1Bids: fighter1Bids || [],
		fighter2Bids: fighter2Bids || []
	};
};
