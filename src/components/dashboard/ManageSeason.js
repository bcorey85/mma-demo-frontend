import React, { useState } from 'react';

import MessageContainer from '../MessageContainer/MessageContainer';

import httpRequest from '../../utils/httpRequest';
import useMessage from '../../hooks/useMessage';
import sumTotal from '../../utils/sumTotal';

import './ManageSeason.scss';

import useDemo from '../../hooks/useDemo';

const ManageSeason = ({
	leagueState,
	auth,
	seasonLeaderboardStats,
	seasonCardStats,
	setSignedUp
}) => {
	const [ message, setMessage, clearMessage ] = useMessage();
	const [ signupConfirmed, setSignupConfirmed ] = useState(false);

	const { handleDemoClick } = useDemo(setMessage);

	const handleSignupConfirm = () => {
		setSignupConfirmed(!signupConfirmed);
	};

	const signup = async () => {
		if (signupConfirmed === false) {
			setMessage({
				type: 'error',
				description: 'Please confirm signup before submitting'
			});
			clearMessage();
			return;
		}
		try {
			const response = await httpRequest({
				url: `${process.env
					.REACT_APP_API_URL}/user/${auth.userId}/season/${leagueState
					.current.activeSeason}/signup`,
				method: 'post',
				token: auth.token
			});

			if (response.type === 'error') {
				setMessage({
					type: response.type,
					description: response.description
				});
				clearMessage();

				return;
			}

			setMessage({
				type: 'success',
				description: response.data.message
			});

			// Trigger state refresh on signup
			setSignedUp(true);
		} catch (error) {
			console.log(error);
			// props.history.push('/500');
		}
	};

	const calculateStatTotals = () => {
		const cards = seasonCardStats.map(card => card.cardNumber);
		const pointsSpent = seasonCardStats.map(
			card => card.results.pointsSpent
		);
		const correctPicks = seasonCardStats.map(
			card => card.results.correctPicks
		);
		const points = seasonCardStats.map(card => card.results.points);
		const adjustments = seasonCardStats.map(
			card => card.results.adjustments
		);
		const adjustedPoints = seasonCardStats.map(
			card => card.results.adjustedPoints
		);

		return {
			totalCards: cards.length,
			pointsSpent: sumTotal(pointsSpent),
			correctPicks: sumTotal(correctPicks),
			points: sumTotal(points),
			adjustments: sumTotal(adjustments),
			adjustedPoints: sumTotal(adjustedPoints)
		};
	};

	const statTotals = calculateStatTotals(seasonCardStats);

	// Check if signups are open and that user does not exist in current season
	if (
		leagueState.current.activeSeasonSignupOpen === true &&
		seasonLeaderboardStats.seasonNumber !== leagueState.current.activeSeason
	) {
		return (
			<div className='manage-season__signup'>
				<h5>
					A new season starting soon sign up now to reserve your spot.
				</h5>
				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
				<div className='manage-season__confirm'>
					<div>
						<label htmlFor='signup'>Confirm Signup: </label>
						<input
							type='checkbox'
							id='signup'
							checked={signupConfirmed}
							onChange={handleSignupConfirm}
						/>
					</div>

					<button
						onClick={handleDemoClick}
						className='btn btn-primary'>
						Sign Up
					</button>
				</div>
			</div>
		);
	}

	// If signups still open, but user has signed up
	if (
		leagueState.current.activeSeasonSignupOpen === true &&
		seasonLeaderboardStats.seasonNumber === leagueState.current.activeSeason
	) {
		return (
			<div className='manage-season__signup'>
				<h5>New season is starting soon. You're all signed up!</h5>
			</div>
		);
	}

	if (seasonCardStats.length > 0) {
		return (
			<section className='manage-season'>
				<h5>Card Stats</h5>
				<table className='manage-season__stats'>
					<thead>
						<tr>
							<th>Card Number</th>
							<th>Points Spent</th>
							<th>Correct Picks</th>
							<th>Initial Points</th>
							<th>Bonus / Penalty</th>
							<th>Total Points</th>
						</tr>
					</thead>
					<tbody>
						{seasonCardStats.map(stat => {
							return (
								<tr key={stat.cardNumber}>
									<td>{stat.cardNumber}</td>
									<td>{stat.results.pointsSpent}</td>
									<td>{stat.results.correctPicks}</td>
									<td>{stat.results.points}</td>
									<td>{stat.results.adjustments || 0}</td>
									<td>{stat.results.adjustedPoints}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<h5>Total Stats</h5>
				<table className='manage-season__stats'>
					<thead>
						<tr>
							<th>Total Cards</th>
							<th>Points Spent</th>
							<th>Correct Picks</th>
							<th>Initial Points</th>
							<th>Bonus / Penalty</th>
							<th>Total Points</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{statTotals.totalCards}</td>
							<td>{statTotals.pointsSpent}</td>
							<td>{statTotals.correctPicks}</td>
							<td>{statTotals.points}</td>
							<td>{statTotals.adjustments}</td>
							<td>{statTotals.adjustedPoints}</td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}

	return 'No current season stats';
};

export default ManageSeason;
