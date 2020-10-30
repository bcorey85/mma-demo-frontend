import React, { useContext, useEffect, useRef, useState } from 'react';
import httpRequest from '../../utils/httpRequest';
import formatDate from '../../utils/formateDate';

import FightName from '../../components/shared/FightName';
import UserStatBlock from '../../components/dashboard/UserStatBlock';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import ManageBids from '../../components/dashboard/ManageBids';
import ManageSeason from '../../components/dashboard/ManageSeason';
import UpdateUserDetails from '../../components/dashboard/UpdateUserDetails';
import PastBids from '../../components/dashboard/PastBids';

import { AuthContext } from '../../contexts/AuthContext';

import './UserDashboard.scss';

const UserDashboard = props => {
	const auth = useContext(AuthContext);

	const [ userData, setUserData ] = useState();
	const [ updateUserDetailsMode, setUpdateUserDetailsMode ] = useState(false);

	const [ seasonLeaderboardStats, setSeasonLeaderboardStats ] = useState();
	const [ seasonCardStats, setSeasonCardStats ] = useState();
	const [ currentUserBids, setCurrentUserBids ] = useState();
	const [ maintenanceMode, setMaintenanceMode ] = useState(false);
	const cardData = useRef();
	const leagueState = useRef();
	const [ signedUp, setSignedUp ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			const getData = async () => {
				try {
					const userDataResponse = await httpRequest({
						method: 'get',
						url: `${process.env
							.REACT_APP_API_URL}/user/${auth.userId}`,
						token: auth.token
					});

					setUserData(userDataResponse.data.userData);

					if (userDataResponse.data.currentUserBids.date) {
						// Change date format from yyyy-mm-dd to mm-dd-yyyy
						userDataResponse.data.currentUserBids.date = formatDate(
							userDataResponse.data.currentUserBids.date
						);
					}

					setCurrentUserBids(userDataResponse.data.currentUserBids);
					setSeasonCardStats(userDataResponse.data.seasonCardStats);
					leagueState.current = userDataResponse.data.leagueState;
					setSeasonLeaderboardStats(
						userDataResponse.data.seasonLeaderboardStats
					);

					const cardDataResponse = await httpRequest({
						method: 'get',
						url: `${process.env.REACT_APP_API_URL}/`,
						token: auth.token
					});

					if (cardDataResponse.type === 'error') {
						setMaintenanceMode(true);
					} else {
						cardData.current = cardDataResponse.data.cardData;
					}

					setIsLoading(false);
				} catch (error) {
					console.log(error);
					props.history.push('/500');
				}
			};

			getData();
		},
		[ auth.token, auth.userId, props.history, signedUp ]
	);

	const logout = async () => {
		await httpRequest({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}/logout/${auth.userId}`,
			token: auth.token,
			payload: {}
		});

		auth.logout();
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (updateUserDetailsMode) {
		return (
			<UpdateUserDetails
				setUpdateUserDetailsMode={setUpdateUserDetailsMode}
				userData={userData}
				auth={auth}
				history={props.history}
			/>
		);
	}

	let currentSeasonControls;

	if (maintenanceMode) {
		currentSeasonControls = (
			<React.Fragment>
				<section className='user-dashboard__section'>
					<h3>Current Season</h3>
					<div>
						Site is currently under maintenance. Please check back
						soon!
					</div>
				</section>
				<section className='user-dashboard__section'>
					<h3>Current Bids</h3>
					<div>
						Site is currently under maintenance. Please check back
						soon!
					</div>
				</section>
			</React.Fragment>
		);
	} else {
		currentSeasonControls = (
			<React.Fragment>
				<section className='user-dashboard__section'>
					<h3>Season {cardData.current.seasonNumber}</h3>
					<ManageSeason
						leagueState={leagueState}
						seasonLeaderboardStats={seasonLeaderboardStats}
						seasonCardStats={seasonCardStats}
						auth={auth}
						history={props.history}
						setSignedUp={setSignedUp}
					/>
				</section>
				<section className='user-dashboard__section'>
					<h3>Card {cardData.current.cardNumber}</h3>
					<ManageBids
						cardData={cardData}
						leagueState={leagueState}
						seasonLeaderboardStats={seasonLeaderboardStats}
						userData={userData}
						auth={auth}
						history={props.history}
						signedUp={signedUp}
						currentUserBids={currentUserBids}
					/>
				</section>
			</React.Fragment>
		);
	}

	return (
		<div className='user-dashboard'>
			<div className='user-dashboard__controls'>
				<button
					className='link'
					onClick={() => setUpdateUserDetailsMode(true)}>
					Edit User Details
				</button>
				<button className='link' onClick={logout} disabled>
					Log Out
				</button>
			</div>

			<section className='user-dashboard__header'>
				<h5>Player Dashboard</h5>
				<div className='user-dashboard__player-info'>
					<FightName
						fightName={userData.fightName}
						lastName={userData.lastName}
						large
					/>
					<div className='user-dashboard__player-stats'>
						<UserStatBlock
							heading='Season Points'
							value={seasonLeaderboardStats.points}
						/>
						<UserStatBlock
							heading='Correct Picks'
							value={seasonLeaderboardStats.correctPicks}
						/>
					</div>
				</div>
			</section>
			{currentSeasonControls}
			<PastBids
				history={props.history}
				auth={auth}
				bids={userData.bids}
			/>
		</div>
	);
};

export default UserDashboard;
