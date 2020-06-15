import React, { useState } from 'react';

const useDemo = setMessage => {
	const [ demoMessage, setDemoMessage ] = useState({
		type: 'success',
		description: 'Database requests are disabled in demo mode.'
	});

	const handleDemoClick = e => {
		e.preventDefault();

		setMessage(demoMessage);
	};

	return { demoMessage, handleDemoClick };
};

export default useDemo;
