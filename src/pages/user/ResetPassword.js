import React, { useContext } from 'react';

import MessageContainer from '../../components/MessageContainer/MessageContainer';

import useInputState from '../../hooks/useInputState';
import useMessage from '../../hooks/useMessage';
import httpRequest from '../../utils/httpRequest';
import passwordUpdateValidate from '../../validators/passwordUpdateValidate';
import { AuthContext } from '../../contexts/AuthContext';

import useDemo from '../../hooks/useDemo';

const ResetPassword = props => {
	const resetToken = props.match.params.resetToken;
	const auth = useContext(AuthContext);
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ message, setMessage, clearMessage ] = useMessage('');

	const { handleDemoClick } = useDemo(setMessage);

	/* REMOVED FOR DEMO MODE */
	// const resetPassword = async e => {
	// 	e.preventDefault();
	// 	const passwordValid = passwordUpdateValidate(password, confirmPassword);

	// 	if (passwordValid.type === 'error') {
	// 		setMessage({
	// 			type: 'error',
	// 			description: passwordValid.description
	// 		});
	// 		clearMessage();
	// 		return;
	// 	}

	// 	try {
	// 		const response = await httpRequest({
	// 			method: 'put',
	// 			url: `${process.env
	// 				.REACT_APP_API_URL}/resetpassword/${resetToken}`,
	// 			payload: {
	// 				password
	// 			}
	// 		});

	// 		if (response.type === 'error') {
	// 			setMessage({
	// 				type: 'error',
	// 				description: response.description
	// 			});
	// 			clearMessage();
	// 			return;
	// 		}

	// 		auth.login(
	// 			response.data.userId,
	// 			response.data.token,
	// 			response.data.isAdmin
	// 		);
	// 		props.history.push(`/user/${response.data.userId}`);
	// 	} catch (error) {
	// 		console.log(error);
	// 		props.history.push('/500');
	// 	}
	// };

	return (
		<section className='forgot-password'>
			<h4>Please enter your account email:</h4>
			<form>
				<label htmlFor='password'>New Password </label>
				<input
					type='password'
					id='password'
					value={password}
					onChange={setPassword}
				/>
				<label htmlFor='confirm-password'>Confirm Password </label>
				<input
					type='password'
					id='confirm-password'
					value={confirmPassword}
					onChange={setConfirmPassword}
				/>
			</form>
			<button className='btn btn-primary' onClick={handleDemoClick}>
				Submit
			</button>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
		</section>
	);
};

export default ResetPassword;
