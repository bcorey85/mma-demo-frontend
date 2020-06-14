import React from 'react';
import AdminFormInput from './AdminForm/AdminFormInput';

import './PlayerNameInputGroup.scss';

const PlayerNameInputGroup = ({ index, player, handleChange }) => {
	return (
		<div className='playername-input-group'>
			<h3>Player {index + 1}</h3>
			<AdminFormInput
				type='text'
				name={`player-${index}-fightName`}
				placeholder='Fight Name'
				handleChange={handleChange}
				value={player.fightName}
			/>
			<AdminFormInput
				type='text'
				name={`player-${index}-lastName`}
				placeholder='Last Name'
				handleChange={handleChange}
				value={player.lastName}
			/>
		</div>
	);
};

export default PlayerNameInputGroup;
