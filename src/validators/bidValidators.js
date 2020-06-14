import checkIncrementof25 from '../utils/checkIncrementof25';

const validateBids = (
	bids,
	bidsRemaining,
	bidsRemainingError,
	pointsAvailableError
) => {
	if (bidsRemaining > 0) {
		return {
			type: 'error',
			description: `You must make the maximum amount of bids possible (minimum of 25 points). You currently have ${bidsRemaining} remaining.`
		};
	}

	if (bidsRemainingError) {
		return {
			type: 'error',
			description:
				'Only a 4 bids can be made per card. Please check your bid choices.'
		};
	}

	if (pointsAvailableError) {
		return {
			type: 'error',
			description:
				'Too many points spent on this card. Please check your bid choices.'
		};
	}

	const invalidBids = checkIncrementof25(bids); // Ensure bids in increment of 25

	if (invalidBids.length > 0) {
		if (invalidBids.length === 1) {
			return {
				type: 'error',
				description: `Fight ${invalidBids[0]
					.fightNumber} contains an invalid bid. Ensure bids are in increments of 25 points.`
			};
		} else {
			const invalidFights = invalidBids.map(bid => bid.fightNumber);
			invalidFights.splice(
				invalidBids.length - 1,
				1,
				`and ${invalidFights[invalidFights.length - 1]}`
			);

			const message = `Fights ${invalidFights.join(
				', '
			)} contain invalid bids. Ensure bids are in increments of 25 points.`;
			return {
				type: 'error',
				description: message
			};
		}
	}
	return {
		type: 'success',
		description: 'Bids valid'
	};
};

export default validateBids;
