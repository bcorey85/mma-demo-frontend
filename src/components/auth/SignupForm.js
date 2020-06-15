import React, { useContext } from 'react';

import httpRequest from '../../utils/httpRequest';
import useInputState from '../../hooks/useInputState';
import useMessage from '../../hooks/useMessage';
import MessageContainer from '../MessageContainer/MessageContainer';
import { AuthContext } from '../../contexts/AuthContext';

import useDemo from '../../hooks/useDemo';

import './SignupForm.scss';

const SignupForm = props => {
	const auth = useContext(AuthContext);
	const [ inviteCode, setInviteCode ] = useInputState('');
	const [ firstName, setFirstName ] = useInputState('');
	const [ fightName, setFightName ] = useInputState('');
	const [ lastName, setLastName ] = useInputState('');
	const [ email, setEmail ] = useInputState('');
	const [ password, setPassword ] = useInputState('');
	const [ message, setMessage, clearMessage ] = useMessage('');

	const { handleDemoClick } = useDemo(setMessage);

	const signup = async e => {
		e.preventDefault();

		const inputs = [
			inviteCode,
			firstName,
			fightName,
			lastName,
			email,
			password
		];

		// Check blank inputs
		if (inputs.includes('')) {
			setMessage({
				type: 'error',
				description: 'Please check required inputs'
			});
			clearMessage();
		}

		const payload = {
			inviteCode,
			firstName,
			fightName,
			lastName,
			email,
			password
		};

		// Make signup request
		const response = await httpRequest({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}/signup`,
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
	};

	return (
		<form className='signup-form'>
			<h5>MMA Fantasy Sports League is currently invite only.</h5>
			<label htmlFor='invitecode'>Invite Code</label>
			<input
				type='text'
				placeholder='Invite Code'
				id='invitecode'
				onChange={setInviteCode}
				value={inviteCode}
				required
				autoComplete='invite-code'
			/>
			<label htmlFor='firstname'>First Name</label>
			<input
				type='text'
				placeholder='First Name'
				id='firstname'
				onChange={setFirstName}
				value={firstName}
				required
				autoComplete='firstname'
			/>
			<label htmlFor='fightname'>Fight Name</label>
			<input
				type='text'
				placeholder='Fight Name'
				id='fightname'
				onChange={setFightName}
				value={fightName}
				required
				autoComplete='fightname'
			/>
			<label htmlFor='lastname'>Last Name</label>
			<input
				type='text'
				placeholder='Last Name'
				id='lastname'
				onChange={setLastName}
				value={lastName}
				required
				autoComplete='lastname'
			/>
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
			<div className='signup-form__controls'>
				<input
					type='password'
					placeholder='Password'
					id='password'
					onChange={setPassword}
					value={password}
					required
					autoComplete='password'
				/>
				<button onClick={signup} className='btn btn-primary'>
					Sign Up
				</button>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</div>
		</form>
	);
};

export default SignupForm;
