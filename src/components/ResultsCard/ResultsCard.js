import React, { useState, useRef, useEffect } from 'react';

import PointDisplay from '../shared/PointDisplay';
import FightCardPagination from '../FightCard/FightCardPagination';

import './ResultsCard.scss';

const ResultsCard = ({
	data,
	seasonNumber,
	cardNumber,
	showPointsSpent,
	showBids
}) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const end = useRef(data.length);
	const limit = useRef(8);
	const [ currentPage, setCurrentPage ] = useState([
		...data.slice(currentIndex, currentIndex + limit)
	]);

	useEffect(
		() => {
			setCurrentPage([
				...data.slice(currentIndex, currentIndex + limit.current)
			]);
		},
		[ currentIndex, data ]
	);

	if (!showBids) {
		return '';
	}

	const handlePrevious = () => {
		let nextIndex = currentIndex - limit.current;

		if (nextIndex <= 0) {
			setCurrentIndex(0);
		}
		setCurrentIndex(nextIndex);
	};

	const handleNext = () => {
		let nextIndex = currentIndex + limit.current;
		if (nextIndex > end.current - limit.current) {
			setCurrentIndex(end.current - limit.current);
		}
		setCurrentIndex(nextIndex);
	};

	const setMinHeight = data.length > 8 ? { minHeight: '40rem' } : null;

	return (
		<div className='results-card'>
			<div className='results-card__header'>
				<h2 className='results-card__title'>
					{showPointsSpent ? 'Total Wagers' : 'Results'}
				</h2>
				Season {seasonNumber} - Card {cardNumber}
			</div>
			<div className='results-card__body' style={setMinHeight}>
				{currentPage.map(player => {
					return (
						<PointDisplay
							fightName={player.fightName}
							lastName={player.lastName}
							points={player.adjustedPoints}
							adjustments={player.adjustments}
							showAdjustments
							key={player.fightName}
							pointsSpent={player.pointsSpent}
							showPointsSpent={showPointsSpent}
						/>
					);
				})}
			</div>
			<FightCardPagination
				handlePrevious={handlePrevious}
				handleNext={handleNext}
				showPrevious={!(currentIndex === 0)}
				showNext={!(currentIndex > end.current - limit.current)}
			/>
		</div>
	);
};

export default ResultsCard;
