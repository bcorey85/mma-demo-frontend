import React from 'react';

import './Input.scss';

const Input = props => {
	const { type, placeholder, name, id } = props;

	if (type === 'textarea') {
		return (
			<div className='input-group'>
				<textarea
					className='textarea'
					name={name}
					id={id}
					placeholder=' '
				/>
				<label htmlFor={placeholder}>{placeholder}</label>
			</div>
		);
	}
	return (
		<div className='input-group'>
			<input
				type={type}
				className='input'
				name={name}
				id={id}
				placeholder=' '
			/>
			<label htmlFor={placeholder}>{placeholder}</label>
		</div>
	);
};

export default Input;
