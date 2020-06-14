import { useState } from 'react';

const useInputState = initVal => {
	const [ state, setState ] = useState(initVal);

	const handleChange = e => {
		setState(e.target.value);
	};

	const reset = e => {
		setState('');
	};
	return [ state, handleChange, reset ];
};

export default useInputState;
