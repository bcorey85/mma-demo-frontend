import React from 'react';

import AdminFormInput from '../AdminForm/AdminFormInput';

import './FightCardFormFighter.scss';

const FightCardFormFighter = ({
	fighter,
	handleChange,
	index,
	fighterNumber
}) => {
	return (
		<div className='fight-card-form__fighter'>
			<h6 className='admin-form__item-title'>Fighter {fighterNumber}</h6>
			<div>
				<AdminFormInput
					type='text'
					placeholder='Image Link'
					value={fighter.image || ''}
					name={`fights-${index}-fighter${fighterNumber}-image`}
					handleChange={handleChange}
					autoComplete='off'
				/>
			</div>
			<div className='fight-card-form__fighter-name'>
				<AdminFormInput
					type='text'
					placeholder='Name'
					value={fighter.name || ''}
					name={`fights-${index}-fighter${fighterNumber}-name`}
					handleChange={handleChange}
					autoComplete='off'
				/>
			</div>
			<div className='fight-card-form__fighter-odds'>
				<AdminFormInput
					type='number'
					placeholder='Odds'
					value={fighter.moneyLine || ''}
					name={`fights-${index}-fighter${fighterNumber}-moneyLine`}
					handleChange={handleChange}
					autoComplete='off'
				/>
			</div>
		</div>
	);
};

export default FightCardFormFighter;
