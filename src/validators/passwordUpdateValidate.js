const passwordUpdateValidate = (password, confirmPassword) => {
	if (password !== confirmPassword) {
		return {
			type: 'error',
			description: 'Passwords do not match.'
		};
	}

	if (password.length < 6) {
		return {
			type: 'error',
			description: 'Password must be at least 6 characters.'
		};
	}

	return {
		type: 'success',
		description: 'Password valid'
	};
};

export default passwordUpdateValidate;
