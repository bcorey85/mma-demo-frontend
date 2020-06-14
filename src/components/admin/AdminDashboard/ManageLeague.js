import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../shared/LoadingSpinner';
import MessageContainer from '../../MessageContainer/MessageContainer';
import httpRequest from '../../../utils/httpRequest';
import useMessage from '../../../hooks/useMessage';

import './ManageLeague.scss';

const ManageLeague = props => {
	const [ isLoading, setIsLoading ] = useState(true);
	const auth = useContext(AuthContext);
	const [ activeSeason, setActiveSeason ] = useState();
	const [ activeSeasonSignupOpen, setActiveSeasonSignupOpen ] = useState();
	const [ activeCard, setActiveCard ] = useState();
	const [ activeCardBidsOpen, setActiveCardBidsOpen ] = useState();
	const [ showBids, setShowBids ] = useState();
	const [ cardNumbers, setCardNumbers ] = useState();
	const [ seasonNumbers, setSeasonNumbers ] = useState();
	const [ message, setMessage, clearMessage ] = useMessage();

	useEffect(
		() => {
			//get active season
			const getData = async () => {
				try {
					const response = await httpRequest({
						method: 'get',
						url: `${process.env.REACT_APP_API_URL}/admin/league`,
						token: auth.token
					});

					setActiveSeason(response.data.league.activeSeason);
					setActiveSeasonSignupOpen(
						response.data.league.activeSeasonSignupOpen.toString() // Change boolean to string
					);
					setActiveCard(response.data.league.activeCard.card);
					setActiveCardBidsOpen(
						response.data.league.activeCardBidsOpen.toString() // Change boolean to string
					);
					setShowBids(
						response.data.league.showBids.toString() // Change boolean to string
					);
					setSeasonNumbers(response.data.seasonNumbers);
					setCardNumbers(response.data.cardNumbers);
					setIsLoading(false);
				} catch (error) {
					props.history.push('/maintenance');
					console.log(error);
				}
			};
			getData();
		},
		[ auth.token, props.history ]
	);

	const handleActiveSeason = async e => {
		setActiveSeason(e.target.value);
		setActiveCard(null);

		if (e.target.value > 0) {
			try {
				const response = await httpRequest({
					method: 'get',
					url: `${process.env
						.REACT_APP_API_URL}/admin/league?season=${e.target
						.value}`,
					token: auth.token
				});
				setCardNumbers(response.data.cardNumbers);
			} catch (error) {
				props.history.push('/500');
				console.log(error);
			}
		} else {
			setCardNumbers([]);
		}
	};

	const handleActiveSeasonSignupOpen = e => {
		setActiveSeasonSignupOpen(e.target.value);
	};

	const handleActiveCard = e => {
		setActiveCard(e.target.value);
	};

	const handleActiveCardBidsOpen = e => {
		setActiveCardBidsOpen(e.target.value);
	};

	const handleShowBids = e => {
		setShowBids(e.target.value);
	};

	const handleSave = async () => {
		const payload = {
			activeSeason,
			activeSeasonSignupOpen,
			activeCard,
			activeCardBidsOpen,
			showBids
		};

		try {
			const response = await httpRequest({
				method: 'put',
				url: `${process.env.REACT_APP_API_URL}/admin/league`,
				token: auth.token,
				payload
			});
			setMessage({
				type: 'success',
				description: response.data.message
			});

			clearMessage();
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

	return (
		<section className='manage-league'>
			<h3>Manage League</h3>
			<section className='manage-league__section'>
				<div className='manage-league__control'>
					<h5>Active Season</h5>
					<select
						name='activeSeason'
						value={activeSeason || ''}
						onChange={handleActiveSeason}>
						<option value={0} />
						{seasonNumbers.map(seasonNumber => {
							return (
								<option value={seasonNumber} key={seasonNumber}>
									Season {seasonNumber}
								</option>
							);
						})}
					</select>
				</div>
				<div className='manage-league__control'>
					<h5>Season Signup</h5>
					<div className='manage-league__radio-group'>
						<div>
							<label htmlFor='season-open'>Open </label>
							<input
								type='radio'
								id='season-open'
								name='season-signup'
								checked={activeSeasonSignupOpen === 'true'}
								onChange={handleActiveSeasonSignupOpen}
								value='true'
							/>
						</div>
						<div>
							<label htmlFor='season-close'>Closed </label>
							<input
								type='radio'
								id='season-close'
								name='season-signup'
								checked={activeSeasonSignupOpen === 'false'}
								onChange={handleActiveSeasonSignupOpen}
								value='false'
							/>
						</div>
					</div>
				</div>
			</section>
			<section className='manage-league__section'>
				<div className='manage-league__control'>
					<h5>Active Card</h5>
					<select
						name='activeCard'
						value={activeCard || ''}
						onChange={handleActiveCard}>
						<option value={0} />
						{cardNumbers.map(cardNumber => {
							return (
								<option value={cardNumber} key={cardNumber}>
									Card {cardNumber}
								</option>
							);
						})}
					</select>
				</div>
				<div className='manage-league__control'>
					<h5>Bids Open</h5>
					<div className='manage-league__radio-group'>
						<div>
							<label htmlFor='bids-open'>Open </label>
							<input
								type='radio'
								id='bids-open'
								name='bids-signup'
								checked={activeCardBidsOpen === 'true'}
								onChange={handleActiveCardBidsOpen}
								value='true'
							/>
						</div>
						<div>
							<label htmlFor='bids-close'>Closed </label>
							<input
								type='radio'
								id='bids-close'
								name='bids-signup'
								checked={activeCardBidsOpen === 'false'}
								onChange={handleActiveCardBidsOpen}
								value='false'
							/>
						</div>
					</div>
				</div>
				<div className='manage-league__control'>
					<h5>Show Bids</h5>
					<div className='manage-league__radio-group'>
						<div>
							<label htmlFor='show-bids'>Show </label>
							<input
								type='radio'
								id='show-bids'
								checked={showBids === 'true'}
								onChange={handleShowBids}
								value='true'
							/>
						</div>
						<div>
							<label htmlFor='hide-bids'>Hide </label>
							<input
								type='radio'
								id='hide-bids'
								checked={showBids === 'false'}
								onChange={handleShowBids}
								value='false'
							/>
						</div>
					</div>
				</div>
			</section>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>
			<button className='btn btn-primary--outline' onClick={handleSave}>
				Save League Options
			</button>
		</section>
	);
};

export default ManageLeague;
