import React from 'react';

import FightName from '../../shared/FightName';
import AdminFormInput from '../AdminForm/AdminFormInput';

const EditBidsFormBids = ({ bids, fighterNumber }) => {
	return (
		<React.Fragment>
			{bids.map((player, index) => {
				return (
					<div className='fight-card-form__bid' key={index}>
						<div>
							<FightName
								fightName={player.user.fightName}
								lastName={player.user.lastName}
							/>
						</div>
						<div className='fight-card-form__bid--stats'>
							<AdminFormInput
								type='text'
								placeholder='Bid'
								name={`fighter${fighterNumber}Bids-${index}-bid`}
								value={player.bid}
								min='0'
								className='number-calc'
								readOnly
							/>
							<AdminFormInput
								type='text'
								placeholder='W/L'
								name={`fighter${fighterNumber}Bids-${index}-outcome`}
								value={player.outcome || ''}
								className='text-calc'
								readOnly
							/>
							<AdminFormInput
								type='text'
								placeholder='Points'
								name={`fighter${fighterNumber}Bids-${index}-points-`}
								value={player.points || ''}
								className='number-calc'
								readOnly
							/>
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
};

export default EditBidsFormBids;
