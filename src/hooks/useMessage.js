import { useState, useCallback } from 'react';

const useMessage = () => {
	const [ message, setMessage ] = useState({ type: '', description: '' });

	const clearMessage = useCallback(() => {
		setTimeout(() => {
			setMessage({ type: 'hidden', description: '' });
		}, 5000);
	}, []);

	return [ message, setMessage, clearMessage ];
};

export default useMessage;
