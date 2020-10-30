import React, { useContext } from 'react';

import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import AdminFormInput from '../../../components/admin/AdminForm/AdminFormInput';
import AdminFormSection from '../../../components/admin/AdminForm/AdminFormSection';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';

import useInputState from '../../../hooks/useInputState';
import useMessage from '../../../hooks/useMessage';
import httpRequest from '../../../utils/httpRequest';
import { AuthContext } from '../../../contexts/AuthContext';
import useDemo from '../../../hooks/useDemo';

const NewSeasonForm = props => {
	const auth = useContext(AuthContext);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ seasonNumber, setSeasonNumber ] = useInputState('');

	const { handleDemoClick } = useDemo(setMessage);

	// eslint-disable-next-line
	const createSeason = async e => {
		e.preventDefault();
		//Stop submit if missing required fields
		if (!seasonNumber) {
			setMessage({
				type: 'error',
				description: 'Required input is empty - Please check.'
			});
			clearMessage();
			return;
		}

		try {
			const response = await httpRequest({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}/admin/season/`,
				payload: { seasonNumber },
				token: auth.token
			});

			console.log(response);

			props.history.push('/admin/dashboard');
		} catch (error) {
			console.log(error);
			if (error.response) {
				console.log(error.response);
				setMessage({
					type: 'error',
					description: error.response.data.error
				});
				clearMessage();
			}
		}
	};

	return (
		<main className='main-content--fw'>
			<AdminFormHeader title='Create Season' />
			<form className='season-form'>
				<AdminFormSection title='Season Number'>
					<AdminFormInput
						type='number'
						name='seasonNumber'
						placeholder='Season Number'
						autoComplete='off'
						value={seasonNumber}
						handleChange={setSeasonNumber}
					/>
				</AdminFormSection>
				<div />
				<div className='season-form__controls'>
					<button
						className='btn btn-primary'
						type='submit'
						onClick={handleDemoClick}>
						Submit
					</button>
				</div>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</form>
		</main>
	);
};

export default NewSeasonForm;
