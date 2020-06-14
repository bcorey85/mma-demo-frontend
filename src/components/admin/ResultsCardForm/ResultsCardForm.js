import React from 'react';

import ResultsCardPlayerResults from './ResultsCardPlayerResults';

import './ResultsCardForm.scss';

const ResultsCardForm = ({ resultsCard, cardNumber, handleChange }) => {
	const playerResults = resultsCard.map((player, index) => {
		return (
			<ResultsCardPlayerResults
				player={player}
				index={index}
				key={player._id}
				handleChange={handleChange}
			/>
		);
	});
	return (
		<div className='results-card-form'>
			<div className='results-card-form__header'>
				<h2 className='results-card-form__title'>
					Card
					{cardNumber}{' '}
				</h2>
				Results
			</div>
			<div>
				<div className='admin-form__stats-block'>
					<div className='admin-form__stats-block-heading'>
						<h6>Adjustments</h6>
					</div>
					<div className='admin-form__stats-block-heading'>
						<h6>Correct Picks</h6>
					</div>
					<div className='admin-form__stats-block-heading'>
						<h6>Points</h6>
					</div>
				</div>
			</div>
			{playerResults}
		</div>
	);
};

export default ResultsCardForm;
