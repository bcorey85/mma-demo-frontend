import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../../contexts/AuthContext';
import useMessage from '../../../hooks/useMessage';
import httpDelete from '../../../utils/httpDelete';
import httpPut from '../../../utils/httpPut';

import Modal from '../../../components/shared/Modal';
import MessageContainer from '../../../components/MessageContainer/MessageContainer';
import AdminFormHeader from '../../../components/admin/AdminForm/AdminFormHeader';
import AdminFormFooterControls from '../../../components/admin/AdminForm/AdminFormFooterControls';
import AdminFormSection from '../../../components/admin/AdminForm/AdminFormSection';
import AdminFormWinTotals from '../../../components/admin/AdminForm/AdminFormWinTotals';
import AdminFormLeaderboard from '../../../components/admin/AdminForm/AdminFormLeaderboard';
import AdminFormCardList from '../../../components/admin/AdminForm/AdminFormCardList';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const EditSeasonForm = props => {
	let { seasonID } = props.match.params;
	const auth = useContext(AuthContext);
	const [ modalShowing, setModalShowing ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ message, setMessage, clearMessage ] = useMessage('');
	const [ leaderBoard, setLeaderBoard ] = useState('');
	const [ winTotals, setWinTotals ] = useState('');
	const [ cards, setCards ] = useState('');

	useEffect(
		() => {
			const getSeason = async () => {
				const response = await axios.get(
					`${process.env
						.REACT_APP_API_URL}/admin/season/${seasonID}/edit`,
					{
						headers: {
							Authorization: 'Bearer ' + auth.token
						}
					}
				);
				setLeaderBoard(response.data.season.sideBar.leaderBoard);
				setWinTotals(response.data.season.sideBar.winTotals);
				setCards(response.data.season.cards);
				setIsLoading(false);
			};
			getSeason();

			if (props.history.location.message) {
				setMessage(props.history.location.message);
				clearMessage();
			}
		},
		[
			auth.token,
			clearMessage,
			props.history.location.message,
			seasonID,
			setMessage
		]
	);

	const toggleModal = e => {
		e.preventDefault();
		setModalShowing(!modalShowing);
	};

	const deleteSeason = async e => {
		e.preventDefault();
		httpDelete(
			`${process.env.REACT_APP_API_URL}/admin/season/${seasonID}`,
			auth.token,
			'/admin/dashboard',
			props.history,
			setModalShowing,
			'Season deleted sucessfully',
			setMessage,
			clearMessage
		);
	};

	const updateSeason = async e => {
		e.preventDefault();
		const seasonUpdate = {
			sideBar: {
				winTotals,
				leaderBoard
			},
			cards
		};

		httpPut(
			`${process.env.REACT_APP_API_URL}/admin/season/${seasonID}/edit`,
			seasonUpdate,
			auth.token,
			`/admin/season/${seasonID}/edit`,
			props.history,
			'Season updated successfully',
			setMessage,
			clearMessage
		);
	};

	const handleWinTotalsChange = e => {
		const identifiers = e.target.name.split('-');
		const type = identifiers[0];
		const card = identifiers[1];
		const field = identifiers[2];
		if (type === 'total') {
			setWinTotals(
				{ ...winTotals },
				(winTotals[type][field] = e.target.value)
			);
		} else {
			setWinTotals(
				{ ...winTotals },
				(winTotals[type][card][field] = e.target.value)
			);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<main className='main-content--fw'>
			<AdminFormHeader title={`Edit Season ${seasonID}`} />
			<form className='season-form'>
				<AdminFormSection title='Cards'>
					<AdminFormCardList cards={cards} seasonNumber={seasonID} />
				</AdminFormSection>
				<div className='admin-form__section'>
					<AdminFormSection title='Leader Board'>
						<AdminFormLeaderboard leaderBoard={leaderBoard} />
					</AdminFormSection>
					<AdminFormSection title='Win Totals'>
						<AdminFormWinTotals
							winTotals={winTotals}
							handleChange={handleWinTotalsChange}
						/>
					</AdminFormSection>

					<AdminFormFooterControls
						b1Text='Update Season'
						b2Text='Delete Season'
						b1HandleClick={updateSeason}
						b2HandleClick={toggleModal}
					/>
					<MessageContainer type={message.type}>
						{message.description}
					</MessageContainer>
				</div>
				{modalShowing && (
					<Modal
						header1='Are you sure you wish to delete this season?'
						header2='WARNING - This action is permanent!'
						toggleModal={toggleModal}
						modalAction={deleteSeason}
						modalActionText='Delete'
					/>
				)}
			</form>
		</main>
	);
};

export default EditSeasonForm;
