import React, { useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';

import useMessage from '../../../hooks/useMessage';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import FightCardForm from '../../../components/admin/FightCardForm/FightCardForm';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import AdminFormFooterControls from '../../../components/admin/AdminForm/AdminFormFooterControls';
import AdminFormInput from '../../../components/admin/AdminForm/AdminFormInput';
import AdminCardForm from '../../../components/admin/AdminForm/AdminCardForm';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

import { AuthContext } from '../../../contexts/AuthContext';
import cardReducer from '../../../reducers/card/cardReducer';
import { limitRange } from '../../../utils/limitNum';

import './NewCardForm.scss';
import useDemo from '../../../hooks/useDemo';

const NewCardForm = props => {
	const auth = useContext(AuthContext);
	const [ cardState, dispatch ] = useReducer(cardReducer);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ numFights, setNumFights ] = useState(7);
	const [ isLoading, setIsLoading ] = useState(true);

	const { handleDemoClick } = useDemo(setMessage);

	useEffect(() => {
		dispatch({
			type: 'CREATE_CARD',
			payload: {
				numFights: 7
			}
		});

		setIsLoading(false);
	}, []);

	const handleChange = e => {
		dispatch({
			type: 'UPDATE_META_FIELD',
			payload: {
				field: e.target.name,
				value: e.target.value
			}
		});
	};

	const handleNumFightsChange = e => {
		const numFights = limitRange(e.target.value, 1, 20);
		setNumFights(numFights);
	};

	const handleNumFightsSet = e => {
		e.preventDefault();
		dispatch({
			type: 'UPDATE_META_FIELD',
			payload: {
				field: 'numFights',
				value: numFights
			}
		});
	};

	const handleFightChange = e => {
		dispatch({
			type: 'UPDATE_FIGHT_FIELD',
			payload: {
				field: e.target.name,
				value: e.target.value
			}
		});
	};

	let { seasonID } = props.match.params;

	const createCard = async e => {
		e.preventDefault();

		const missingFightInputs = cardState.fights.filter(fight => {
			if (
				fight.fighter1.image === '' ||
				fight.fighter1.name === '' ||
				fight.fighter2.image === '' ||
				fight.fighter2.name === ''
			) {
				return fight;
			}
			return null;
		});

		if (
			!cardState.cardNumber ||
			missingFightInputs.length > 0 ||
			!cardState.eventName ||
			!cardState.date
		) {
			setMessage({
				type: 'error',
				description: 'Required input is empty - Please check.'
			});
			clearMessage();
			return;
		}

		const newCard = cardState;

		try {
			await axios.post(
				`${process.env
					.REACT_APP_API_URL}/admin/season/${seasonID}/card`,
				newCard,
				{
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				}
			);
			props.history.push(`/admin/season/${seasonID}/edit`);
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

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const formInputs = cardState.fights.map((fight, index) => {
		return (
			<FightCardForm
				fight={fight}
				index={index}
				handleChange={handleFightChange}
				key={index}
			/>
		);
	});

	return (
		<main className='main-content--fw'>
			<AdminFormHeader
				title={'Create Card'}
				subtitle={`Season ${seasonID}`}
			/>

			<form>
				<div>
					<AdminFormInput
						type='number'
						id='num'
						label='Card'
						placeholder='#'
						name='num'
						handleChange={handleChange}
						value={cardState.cardNumber || ''}
						autoComplete='off'
					/>

					<AdminFormInput
						type='text'
						label='Event Name'
						name='eventName'
						id='eventName'
						placeholder='Event Name'
						handleChange={handleChange}
						value={cardState.eventName || ''}
						autoComplete='off'
					/>

					<AdminFormInput
						type='date'
						label='Date'
						id='date'
						name='date'
						placeholder='Date'
						handleChange={handleChange}
						value={cardState.date || ''}
						autoComplete='off'
					/>
					<div className='num-fights-control'>
						<div>
							<AdminFormInput
								type='number'
								label='Number of Fights'
								id='numFights'
								name='numFights'
								placeholder='Number of Fights'
								handleChange={handleNumFightsChange}
								value={numFights || ''}
								autoComplete='off'
								min={1}
								max={20}
							/>
						</div>

						{cardState.fights.length !== parseInt(numFights) && (
							<button
								className='admin-form__link'
								onClick={handleNumFightsSet}>
								Set
							</button>
						)}
					</div>

					<AdminFormInput
						type='number'
						label='Max Bids'
						id='maxBids'
						name='maxBids'
						placeholder='Max Bids'
						handleChange={handleChange}
						value={cardState.maxBids || ''}
						autoComplete='off'
						min={1}
						max={20}
					/>
				</div>
				<AdminCardForm>{formInputs}</AdminCardForm>
				<AdminFormFooterControls
					b1Text='Create Card'
					b1HandleClick={handleDemoClick}
				/>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</form>
		</main>
	);
};

export default NewCardForm;
