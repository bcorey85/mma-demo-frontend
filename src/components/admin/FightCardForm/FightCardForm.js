import React from 'react';
import { NavLink } from 'react-router-dom';

import FightCardFormFighter from './FightCardFormFighter';

import './FightCardForm.scss';

const FightCardForm = ({
	fight,
	index,
	cardNumber,
	seasonNumber,
	handleChange
}) => {
	let formControls;
	if (fight.fighter1Bids.length > 0 || fight.fighter2Bids.length > 0) {
		formControls = (
			<div className='fight-card-form__footer-controls'>
				<div>
					<NavLink
						to={`/admin/season/${seasonNumber}/card/${cardNumber}/fight/${index +
							1}/edit`}
						className='admin-form__link'>
						Edit Fight
						{index + 1} Bids
					</NavLink>
				</div>
			</div>
		);
	}
	return (
		<div className='fight-card-form'>
			<h2 className='fight-card-form__title'>Fight {index + 1}</h2>
			<div className='fight-card-form__header'>
				<FightCardFormFighter
					fighter={fight.fighter1}
					index={index}
					handleChange={handleChange}
					fighterNumber='1'
				/>
				<div className='fight-card-form__vs'>vs</div>
				<FightCardFormFighter
					fighter={fight.fighter2}
					index={index}
					handleChange={handleChange}
					fighterNumber='2'
				/>
			</div>
			{formControls ? formControls : ''}
		</div>
	);
};

export default FightCardForm;
