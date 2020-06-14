import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import useInputState from '../../hooks/useInputState';
import httpRequest from '../../utils/httpRequest';
import useMessage from '../../hooks/useMessage';
import MessageContainer from '../MessageContainer/MessageContainer';
import { AuthContext } from '../../contexts/AuthContext';

import './LoginForm.scss';

const LoginForm = props => {
	const auth = useContext(AuthContext);
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage, clearMessage ] = useMessage('');

	const login = async e => {
		e.preventDefault();

		const inputs = [ email, password ];

		// Check blank inputs
		if (inputs.includes('')) {
			//Error handling
			setMessage({
				type: 'error',
				description: 'Please check required inputs'
			});
			clearMessage();
			return;
		}

		const payload = {
			email,
			password
		};

		// Make signup request
		try {
			const response = await httpRequest({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}/login`,
				token: null,
				payload
			});

			// Error handling
			if (response && response.type === 'error') {
				setMessage({
					type: response.type,
					description: response.description
				});
				clearMessage();
				return;
			}

			auth.login(
				response.data.userId,
				response.data.token,
				response.data.isAdmin
			);

			props.history.push(`/user/${response.data.userId}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className='login-form'>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				placeholder='Email'
				id='email'
				onChange={setEmail}
				value={email}
				required
				autoComplete='email'
			/>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				placeholder='Password'
				id='password'
				onChange={setPassword}
				value={password}
				required
				autoComplete='password'
			/>
			<div className='login-form__controls'>
				<button onClick={login} className='btn btn-primary'>
					Log In
				</button>
				<NavLink to='/forgotpassword' className='link'>
					Reset Password
				</NavLink>
			</div>
		</form>
	);
};

export default LoginForm;
