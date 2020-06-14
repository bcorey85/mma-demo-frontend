import React, { useState } from 'react';

import MessageContainer from '../../components/MessageContainer/MessageContainer';

import useInputState from '../../hooks/useInputState';
import useMessage from '../../hooks/useMessage';
import httpRequest from '../../utils/httpRequest';

import './ForgotPassword.scss';

const ForgotPassword = props => {
	const [ email, setEmail ] = useInputState('');
	const [ message, setMessage, clearMessage ] = useMessage({});
	const [ requestSent, setRequestSent ] = useState(false);
	const recoverPassword = async e => {
		e.preventDefault();
		if (!email) {
			setMessage({
				type: 'error',
				description: 'Please enter a valid email'
			});
			clearMessage();
			return;
		}

		try {
			const response = await httpRequest({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}/forgotpassword`,
				payload: {
					email
				}
			});

			if (response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
				return;
			}

			setRequestSent(true);
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	if (requestSent) {
		return (
			<section className='forgot-password'>
				<h4>Password recovery email sent, please check your email.</h4>
				<h4>-</h4>
				<h4>
					If you're unable to locate it in your inbox, check your spam
					folder.
				</h4>
			</section>
		);
	}

	return (
		<section className='forgot-password'>
			<h4>Please enter your account email:</h4>
			<form>
				<label htmlFor='email'>Email </label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={setEmail}
					autoComplete='email'
				/>
			</form>
			<button className='btn btn-primary' onClick={recoverPassword}>
				Submit
			</button>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
		</section>
	);
};

export default ForgotPassword;
