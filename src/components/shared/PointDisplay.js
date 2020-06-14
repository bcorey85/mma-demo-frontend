import React from 'react';

import FightName from './FightName';

import './PointDisplay.scss';

const PointDisplay = ({
	fightName,
	lastName,
	bid,
	points,
	showBid,
	adjustments,
	showAdjustments,
	pointsSpent,
	showPointsSpent
}) => {
	const playerPoints = points => {
		if (points > 0) {
			return <span className={'u-text--win'}>+{points}</span>;
		} else if (points < 0) {
			return <span className={'u-text--lose'}>{points}</span>;
		} else {
			return <span>{points}</span>;
		}
	};

	const playerAdjustments = adjustments => {
		if (adjustments > 0) {
			return (
				<span className='point-display__adjustments'>
					<span className={'u-text--win'}>+{adjustments} </span>
					Bonus
				</span>
			);
		} else if (adjustments < 0) {
			return (
				<span className='point-display__adjustments'>
					<span className={'u-text--lose'}>{adjustments} </span>
					Penalty
				</span>
			);
		}
	};
	return (
		<div className='point-display'>
			<FightName fightName={fightName} lastName={lastName} />
			<div className='point-display__points'>
				<div>
					{showBid && bid}
					{showAdjustments && playerAdjustments(adjustments)}
					{points && showBid ? ' / ' : ''}
					{pointsSpent && showPointsSpent ? pointsSpent : ''}
					{points && !showPointsSpent ? playerPoints(points) : ''}
				</div>
			</div>
		</div>
	);
};

export default PointDisplay;
