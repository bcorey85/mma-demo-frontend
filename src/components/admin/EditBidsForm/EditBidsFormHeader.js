import React from 'react';

const EditBidsFormHeader = ({ fighter, fighterNumber, handleChange }) => {
	return (
		<React.Fragment>
			<h6>Fighter {fighterNumber} Bids</h6>
			<p>{fighter.name}</p>
			<p>{fighter.moneyLine}</p>
			{/* <AdminFormInput
				type='text'
				placeholder='W/L/X'
				name={`fighter${fighterNumber}-outcome`}
				value={fighter.outcome}
				handleChange={handleChange}
			/> */}
			<select
				value={fighter.outcome || ''}
				name={`fighter${fighterNumber}-outcome`}
				className='admin-form-input'
				onChange={handleChange}>
				<option value={null} />
				<option value='w'>Win</option>
				<option value='l'>Loss</option>
				<option value='x'>NC/DQ</option>
			</select>
			<div className='admin-form__stats-block'>
				<div className='admin-form__stats-block-heading'>
					<h6>Bid</h6>
				</div>
				<div className='admin-form__stats-block-heading'>
					<h6>Outcome</h6>
				</div>
				<div className='admin-form__stats-block-heading'>
					<h6>Points</h6>
				</div>
			</div>
		</React.Fragment>
	);
};

export default EditBidsFormHeader;
