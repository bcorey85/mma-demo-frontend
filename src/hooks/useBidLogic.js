import { useState, useCallback, useEffect } from 'react';
import { calcPointsSpent, calcBidsRemaining } from '../utils/calcBids';

const useBidLogic = ({ bidsArray, initialPointsVal, maxBids }) => {
	const [ bids, setBids ] = useState(bidsArray);
	const [ initialPoints, setInitialPoints ] = useState(initialPointsVal);
	const [ bidsRemaining, setBidsRemaining ] = useState();
	const [ pointsSpent, setPointsSpent ] = useState(0);
	const [ pointsAvailable, setPointsAvailable ] = useState(initialPointsVal);
	const [ bidsRemainingError, setBidsRemainingError ] = useState(false);
	const [ pointsAvailableError, setPointsAvailableError ] = useState(false);
	const pointsObj = calcPointsSpent(bids, initialPoints);
	const bidsObj = calcBidsRemaining(bids, initialPoints, maxBids);

	useEffect(
		() => {
			setPointsSpent(pointsObj.pointsSpent);
			setPointsAvailable(pointsObj.pointsAvailable);
			setPointsAvailableError(pointsObj.pointsAvailableError);

			setBidsRemaining(bidsObj.bidsRemaining);
			setBidsRemainingError(bidsObj.bidsRemainingError);
		},
		[
			bidsObj.bidsRemaining,
			bidsObj.bidsRemainingError,
			pointsObj.pointsAvailable,
			pointsObj.pointsAvailableError,
			pointsObj.pointsSpent
		]
	);

	const updateBidLogic = useCallback((bids, initialPoints) => {
		setBids(bids);
		setInitialPoints(initialPoints);
	}, []);

	return {
		pointsAvailable,
		pointsSpent,
		bidsRemaining,
		pointsAvailableError,
		bidsRemainingError,
		updateBidLogic
	};
};

export default useBidLogic;
