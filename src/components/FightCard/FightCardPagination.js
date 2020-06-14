import React from 'react';

import './FightCardPagination.scss';
const FightCardPagination = ({
	handlePrevious,
	handleNext,
	showPrevious,
	showNext
}) => {
	return (
		<div className='fight-card__pagination'>
			{showPrevious && (
				<button
					className='fight-card__pagination-button fight-card__pagination-button--previous'
					onClick={handlePrevious}>
					Previous
				</button>
			)}
			{showNext && (
				<button
					className='fight-card__pagination-button fight-card__pagination-button--next'
					onClick={handleNext}>
					Next
				</button>
			)}
		</div>
	);
};

export default FightCardPagination;
