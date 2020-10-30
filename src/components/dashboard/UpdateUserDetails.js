import React from 'react';

import MessageContainer from '../../components/MessageContainer/MessageContainer';

import httpRequest from '../../utils/httpRequest';
import useInputState from '../../hooks/useInputState';
import useMessage from '../../hooks/useMessage';
import passwordUpdateValidate from '../../validators/passwordUpdateValidate';

import useDemo from '../../hooks/useDemo';

import './UpdateUserDetails.scss';

const UpdateUserDetails = ({
	userData,
	setUpdateUserDetailsMode,
	auth,
	history
}) => {
	const [ email, setEmail ] = useInputState(userData.email);
	const [ firstName, setFirstName ] = useInputState(userData.firstName);
	const [ fightName, setFightName ] = useInputState(userData.fightName);
	const [ lastName, setLastName ] = useInputState(userData.lastName);
	const [ password, setPassword ] = useInputState('');
	const [ confirmPassword, setConfirmPassword ] = useInputState('');
	const [ message, setMessage, clearMessage ] = useMessage('');

	const { handleDemoClick } = useDemo(setMessage);

	/* REMOVED FOR DEMO MODE */
	// const submitUserDetails = async e => {
	// 	e.preventDefault();
	// 	const inputState = {
	// 		email,
	// 		firstName,
	// 		fightName,
	// 		lastName,
	// 		password,
	// 		confirmPassword
	// 	};

	// 	if (password || confirmPassword) {
	// 		const passwordValid = passwordUpdateValidate(
	// 			password,
	// 			confirmPassword
	// 		);

	// 		if (passwordValid.type === 'error') {
	// 			setMessage({
	// 				type: 'error',
	// 				description: passwordValid.description
	// 			});
	// 			clearMessage();
	// 			return;
	// 		}
	// 	}

	// 	try {
	// 		const response = await httpRequest({
	// 			method: 'put',
	// 			url: `${process.env.REACT_APP_API_URL}/user/${userData._id}`,
	// 			token: auth.token,
	// 			payload: {
	// 				inputState
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

	// 		setMessage({
	// 			type: 'success',
	// 			description: 'User details update successful'
	// 		});
	// 		setTimeout(() => {
	// 			setUpdateUserDetailsMode(false);
	// 		}, 1000);
	// 	} catch (error) {
	// 		console.log(error);
	// 		history.push('/500');
	// 	}
	// };

	return (
		<form className='update-user-details'>
			<button
				onClick={() => setUpdateUserDetailsMode(false)}
				className='link'>
				Go Back
			</button>
			<h5>Update Details</h5>
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				id='email'
				value={email}
				onChange={setEmail}
				autoComplete='email'
			/>

			<label htmlFor='first-name'>First Name</label>
			<input
				type='text'
				id='first-name'
				value={firstName}
				onChange={setFirstName}
				autoComplete='firstname'
			/>

			<label htmlFor='fight-name'>Fight Name</label>
			<input
				type='text'
				id='fight-name'
				value={fightName}
				onChange={setFightName}
				autoComplete='fightname'
			/>

			<label htmlFor='last-name'>Last Name</label>
			<input
				type='text'
				id='last-name'
				value={lastName}
				onChange={setLastName}
				autoComplete='lastname'
			/>

			<h5>Update Password</h5>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				id='password'
				value={password}
				onChange={setPassword}
				autoComplete='new-password'
			/>

			<label htmlFor='confirm-password'>Confirm Password</label>
			<input
				type='password'
				id='confirm-password'
				value={confirmPassword}
				onChange={setConfirmPassword}
				autoComplete='confirm-new-password'
			/>

			<button className='btn btn-primary' onClick={handleDemoClick}>
				Submit
			</button>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
		</form>
	);
};

export default UpdateUserDetails;
