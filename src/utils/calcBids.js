export const calcInitialBidsRemaining = (initialPoints, maxBids) => {
	// Player must make at least max (set on card) bids if possible, or the max amount possible of 25 point bids
	const pointsAvailable = initialPoints;
	const maxPossibleBids = pointsAvailable / 25;

	let initialBidsRemaining;
	if (maxPossibleBids >= maxBids) {
		initialBidsRemaining = maxBids;
	} else {
		initialBidsRemaining = Math.floor(maxPossibleBids);
	}
	return initialBidsRemaining;
};

export const calcPointsSpent = (bidsArray, initialPoints) => {
	const pointsSpent = bidsArray
		.filter(bid => bid.bid !== null)
		.map(bid => bid.bid)
		.reduce((acc, cur) => acc + cur, 0);

	let pointsAvailableError;
	let pointsAvailable;

	if (pointsSpent === 0) {
		pointsAvailableError = false;
		pointsAvailable = initialPoints;
	} else {
		const newPointsAvailable = initialPoints - pointsSpent;

		if (newPointsAvailable < 0) {
			pointsAvailableError = true;
		} else {
			pointsAvailableError = false;
		}
		pointsAvailable = newPointsAvailable;
	}

	return {
		pointsSpent,
		pointsAvailable,
		pointsAvailableError
	};
};

export const calcBidsRemaining = (bidsArray, initialPoints, maxBids) => {
	const initialBidsRemaining = calcInitialBidsRemaining(
		initialPoints,
		maxBids
	);
	const totalBids = bidsArray.filter(bid => bid.fighter && bid.bid).length;
	const bidsRemaining = initialBidsRemaining - totalBids;

	let bidsRemainingError;
	if (bidsRemaining < 0) {
		bidsRemainingError = true;
	} else {
		bidsRemainingError = false;
	}

	return {
		bidsRemaining,
		bidsRemainingError
	};
};
