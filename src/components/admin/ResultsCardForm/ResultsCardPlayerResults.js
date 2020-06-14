import React from 'react';

import AdminFormInput from '../AdminForm/AdminFormInput';
import FightName from '../../shared/FightName';

const ResultsCardPlayerResults = ({ player, index, handleChange }) => {
	return (
		<div>
			<div className='results-card-form__result'>
				<FightName
					fightName={player.fightName}
					lastName={player.lastName}
				/>
				<div className='admin-form__stats-block'>
					<div className='admin-form__stats-block-item'>
						<AdminFormInput
							type='number'
							value={player.adjustments || ''}
							name={`resultsCard-${index}-adjustments`}
							handleChange={handleChange}
						/>
					</div>
					<div className='admin-form__stats-block-item'>
						<AdminFormInput
							className='number-calc'
							type='number'
							value={player.correctPicks || ''}
							name={`resultsCard-${index}-correctPicks`}
							readOnly
						/>
					</div>
					<div className='admin-form__stats-block-item'>
						<AdminFormInput
							className='number-calc'
							type='number'
							value={player.adjustedPoints || ''}
							name={`resultsCard-${index}-adjustedPoints`}
							readOnly
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultsCardPlayerResults;
