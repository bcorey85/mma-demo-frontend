import React, { useContext, useState } from 'react';

import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';

import useInputState from '../../../hooks/useInputState';
import httpRequest from '../../../utils/httpRequest';
import './SendEmail.scss';
import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';

import useDemo from '../../../hooks/useDemo';

const SendEmail = props => {
	const auth = useContext(AuthContext);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ title, setTitle ] = useInputState('');
	const [ body, setBody ] = useInputState('');
	const [ activeSeasonUsers, setActiveSeasonUsers ] = useState('true');

	const { handleDemoClick } = useDemo(setMessage);

	const handleUserSelect = e => {
		setActiveSeasonUsers(e.target.value);
	};

	const sendEmail = async e => {
		e.preventDefault();

		const payload = {
			activeSeasonUsers,
			title,
			body
		};

		try {
			const response = await httpRequest({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}/admin/user/sendemail`,
				token: auth.token,
				payload,
				redirectURL: '/admin/dashboard',
				history: props.history,
				message: 'Email successful'
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
				return;
			}
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	return (
		<main className='main-content--fw'>
			<AdminFormHeader title={'Send Email'} />
			<form className='send-email'>
				<div className='send-email__radio-group'>
					<div>
						<label htmlFor='activeSeasonUsers'>
							Active Season Users Only{' '}
						</label>
						<input
							type='radio'
							id='activeSeasonUsers'
							checked={activeSeasonUsers === 'true'}
							onChange={handleUserSelect}
							value='true'
						/>
					</div>
					<div>
						<label htmlFor='allUsers'>All Users </label>
						<input
							type='radio'
							id='allUsers'
							checked={activeSeasonUsers === 'false'}
							onChange={handleUserSelect}
							value='false'
						/>
					</div>
				</div>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					className='admin-form__input'
					value={title}
					onChange={setTitle}
				/>

				<label htmlFor='body'>Body</label>
				<textarea id='body' value={body} onChange={setBody} />
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
				<button onClick={handleDemoClick} className='btn btn-primary'>
					Send Email
				</button>
			</form>
		</main>
	);
};

export default SendEmail;
