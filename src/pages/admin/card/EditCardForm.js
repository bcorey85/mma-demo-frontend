import React, { useState, useEffect, useContext, useReducer } from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../../../components/shared/Modal';
import FightCardForm from '../../../components/admin/FightCardForm/FightCardForm';
import ResultsCardForm from '../../../components/admin/ResultsCardForm/ResultsCardForm';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import AdminFormInput from '../../../components/admin/AdminForm/AdminFormInput';
import AdminFormFooterControls from '../../../components/admin/AdminForm/AdminFormFooterControls';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import PaginationControls from '../../../components/shared/PaginationControls';
import AdminCardForm from '../../../components/admin/AdminForm/AdminCardForm';

import cardReducer from '../../../reducers/card/cardReducer';
import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';
import httpRequest from '../../../utils/httpRequest';
import {
	editCardAction,
	updateMetaFieldAction,
	updateFightFieldAction,
	updateResultsCardAction
} from '../../../reducers/card/cardActions';

import useDemo from '../../../hooks/useDemo';

import './EditCardForm.scss';

const EditCardForm = props => {
	const auth = useContext(AuthContext);
	const [ cardState, dispatch ] = useReducer(cardReducer);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ pagination, setPagination ] = useState();
	const [ deleteCardModalShowing, setDeleteCardModalShowing ] = useState(
		false
	);
	const { seasonID, cardID } = props.match.params;
	const [ message, setMessage, clearMessage ] = useMessage('');

	const { handleDemoClick } = useDemo(setMessage);

	useEffect(
		() => {
			const getCard = async () => {
				const response = await httpRequest({
					method: 'get',
					url: `${process.env
						.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}/`,
					token: auth.token
				});
				dispatch(editCardAction(response.data.card));
				setPagination(response.data.pagination);
				setIsLoading(false);
			};
			getCard();
			if (props.history.location.message) {
				setMessage(props.history.location.message);
				clearMessage();
			}
		},
		[
			auth.token,
			cardID,
			clearMessage,
			props.history.location,
			props.history.location.message,
			seasonID,
			setIsLoading,
			setMessage
		]
	);

	const toggleDeleteCardModal = e => {
		e.preventDefault();
		setDeleteCardModalShowing(!deleteCardModalShowing);
	};

	// eslint-disable-next-line
	const deleteCard = async e => {
		e.preventDefault();
		try {
			const response = await httpRequest({
				method: 'delete',
				url: `${process.env
					.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}`,
				token: auth.token,
				redirectURL: `/admin/season/${seasonID}/edit`,
				history: props.history,
				message: 'Card deleted successfully'
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
			}
			clearMessage();
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	// eslint-disable-next-line
	const updateCard = async e => {
		e.preventDefault();
		const updatedCard = {
			fights: cardState.fights,
			resultsCard: cardState.resultsCard,
			eventName: cardState.eventName,
			date: cardState.date
		};

		try {
			const response = await httpRequest({
				method: 'put',
				url: `${process.env
					.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}`,
				token: auth.token,
				payload: updatedCard,
				redirectURL: `/admin/season/${seasonID}/edit`,
				history: props.history,
				message: 'Card update successful'
			});

			if (response && response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
			}
		} catch (error) {
			console.log(error);
			props.history.push('/500');
		}
	};

	const handleMetaChange = e => {
		dispatch(updateMetaFieldAction(e.target.name, e.target.value));
	};

	const handleFightChange = e => {
		dispatch(updateFightFieldAction(e.target.name, e.target.value));
	};

	const handleResultsChange = e => {
		dispatch(updateResultsCardAction(e.target.name, e.target.value));
	};

	const deleteCardModal = (
		<Modal
			header1='Are you sure you wish to delete this CARD?'
			header2='WARNING - This action is Permanent!'
			toggleModal={toggleDeleteCardModal}
			modalAction={handleDemoClick}
			modalActionText='Delete'
		/>
	);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const fightCards = cardState.fights.map((fight, index) => {
		return (
			<FightCardForm
				fight={fight}
				index={index}
				cardNumber={cardID}
				seasonNumber={seasonID}
				handleChange={handleFightChange}
				key={`fight ${index + 1}`}
			/>
		);
	});

	return (
		<main className='main-content--fw'>
			<AdminFormHeader
				title='Edit Card'
				subtitle={`Season ${seasonID} - Card ${cardID}`}
			/>
			<PaginationControls
				pagination={pagination}
				route='/admin/season/:seasonID/card/:cardID/edit'
			/>
			<div className='edit-card-form'>
				<div className='edit-card-form__meta'>
					<AdminFormInput
						label='Event Name'
						id='eventName'
						name='eventName'
						type='text'
						placeholder='Event Name'
						handleChange={handleMetaChange}
						value={cardState.eventName}
						autoComplete='off'
					/>
					<AdminFormInput
						label='Date'
						id='date'
						name='date'
						type='date'
						placeholder='Date'
						handleChange={handleMetaChange}
						value={cardState.date}
						autoComplete='off'
					/>
					<NavLink
						className='btn btn-primary--outline'
						to={`/admin/season/${seasonID}/card/${cardID}/table`}>
						Card Data Table
					</NavLink>
				</div>

				<AdminCardForm>
					{fightCards}
					<ResultsCardForm
						resultsCard={cardState.resultsCard}
						cardNumber={cardID}
						handleChange={handleResultsChange}
					/>
				</AdminCardForm>
				<AdminFormFooterControls
					b1Text='Update Card'
					b1HandleClick={handleDemoClick}
					b2Text='Delete Card'
					b2HandleClick={toggleDeleteCardModal}
				/>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
			</div>
			{deleteCardModalShowing && deleteCardModal}
		</main>
	);
};

export default EditCardForm;
