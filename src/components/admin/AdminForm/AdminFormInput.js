import React from 'react';

import './AdminFormInput.scss';

const Input = ({
	id,
	label,
	name,
	className,
	placeholder,
	handleChange,
	value,
	type,
	min,
	max,
	autoComplete,
	readOnly
}) => {
	if (type === 'number') {
		return (
			<React.Fragment>
				<label htmlFor={id} className='admin-form-input__label'>
					{label}
				</label>
				<input
					className={`admin-form-input ${className
						? `admin-form-input--${className}`
						: ''}`}
					type={type}
					id={id}
					name={name}
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					min={min}
					max={max}
					autoComplete={autoComplete}
					readOnly={readOnly ? readOnly : ''}
				/>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className='admin-form-input__label'>
				{label}
			</label>
			<input
				className={`admin-form-input ${className
					? `admin-form-input--${className}`
					: ''}`}
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				autoComplete={autoComplete}
				readOnly={readOnly ? readOnly : ''}
			/>
		</React.Fragment>
	);
};

export default Input;
