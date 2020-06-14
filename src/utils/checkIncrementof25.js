const checkIncrementof25 = bids => {
	const bidsArray = bids.filter(bid => bid.bid !== null);
	const invalidBids = bidsArray.filter(
		bid => (bid.bid % 25 !== 0 ? bid : null)
	);
	return invalidBids;
};

export default checkIncrementof25;
