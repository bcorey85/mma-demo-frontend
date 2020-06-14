import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';

import './Login.scss';

const Login = props => {
	const [ signupMode, setSignupMode ] = useState(false);
	const toggleSignupMode = () => {
		setSignupMode(!signupMode);
	};

	const loginToggleButton = (
		<button onClick={toggleSignupMode} className='link'>
			Already have an account?
		</button>
	);

	const signUpToggleButton = (
		<button onClick={toggleSignupMode} className='link'>
			Need an account?
		</button>
	);

	return (
		<div className='login'>
			{signupMode ? (
				<SignupForm history={props.history} />
			) : (
				<LoginForm history={props.history} />
			)}
			{signupMode ? loginToggleButton : signUpToggleButton}
		</div>
	);
};

export default Login;
