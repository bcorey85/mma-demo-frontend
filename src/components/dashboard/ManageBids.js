import React, { useState, useEffect } from 'react';

import UserBidCard from './UserBidCard';
import UserBidSummary from './UserBidSummary';
import UserStatBlock from './UserStatBlock';
import MessageContainer from '../MessageContainer/MessageContainer';
import LoadingSpinner from '../shared/LoadingSpinner';

import httpRequest from '../../utils/httpRequest';
import useMessage from '../../hooks/useMessage';
import validateBids from '../../validators/bidValidators';
import calcPoints from '../../utils/calcPoints';
import useBidLogic from '../../hooks/useBidLogic';

import useDemo from '../../hooks/useDemo';

const ManageBids = ({
	cardData,
	leagueState,
	auth,
	seasonLeaderboardStats,
	history,
	signedUp,
	currentUserBids
}) => {
	const [ isLoading, setIsLoading ] = useState(true);

	const [ initialPoints, setInitialPoints ] = useState(
		seasonLeaderboardStats.points
	);
	const [ initialBidState, setInitialBidState ] = useState();
	const [ bids, setBids ] = useState([]);
	const [ existingBids, setExistingBids ] = useState(false);
	const [ editBidsMode, setEditBidsMode ] = useState(false);
	const [ message, setMessage, clearMessage ] = useMessage({});

	const { handleDemoClick } = useDemo(setMessage);

	const {
		pointsAvailable,
		pointsSpent,
		bidsRemaining,
		pointsAvailableError,
		bidsRemainingError,
		updateBidLogic
	} = useBidLogic({
		bidsArray: [],
		initialPointsVal: 0,
		maxBids: cardData.current.maxBids || 4
	});

	useEffect(
		() => {
			const createBidState = () => {
				// Populate current bids for edit if available
				let bidState;
				if (currentUserBids.bids.length > 0) {
					bidState = cardData.current.fights.map(fight => {
						const currentFightBid = currentUserBids.bids.filter(
							bid => bid.fightNumber === fight.fightNumber
						)[0];
						if (currentFightBid !== undefined) {
							const bid = currentFightBid.bid;
							const fighter = currentFightBid.fighter;
							const moneyLine = currentFightBid.moneyLine;

							return {
								seasonNumber: cardData.current.seasonNumber,
								cardNumber: cardData.current.cardNumber,
								fightNumber: fight.fightNumber,
								bid: bid,
								fighter: fighter,
								moneyLine: moneyLine
							};
						} else {
							return {
								seasonNumber: cardData.current.seasonNumber,
								cardNumber: cardData.current.cardNumber,
								fightNumber: fight.fightNumber,
								bid: null,
								fighter: '',
								moneyLine: null
							};
						}
					});
					setExistingBids(true);
				} else {
					// Select only fighter info, not bids. use fighter name, moneyline to create bid state
					bidState = cardData.current.fights.map(fight => {
						return {
							seasonNumber: cardData.current.seasonNumber,
							cardNumber: cardData.current.cardNumber,
							fightNumber: fight.fightNumber,
							bid: null,
							fighter: '',
							moneyLine: null
						};
					});
				}

				updateBidLogic(bidState, initialPoints);

				// If no initial bids, set edit mode to true to enable image click select
				const checkInitialEditMode =
					bidState.map(bid => bid.bid).reduce((acc, cur) => {
						return acc + cur;
					}, 0) === 0;

				setBids(bidState);
				setInitialBidState(bidState);
				setEditBidsMode(checkInitialEditMode);

				return bidState;
			};

			createBidState();
			setIsLoading(false);
		},
		[ cardData, currentUserBids, initialPoints, updateBidLogic ]
	);

	useEffect(
		() => {
			setInitialPoints(seasonLeaderboardStats.points);
			if (!currentUserBids) {
				updateBidLogic([], initialPoints);
			} else {
				updateBidLogic(currentUserBids.bids, initialPoints);
			}
		},
		[
			signedUp,
			seasonLeaderboardStats.points,
			currentUserBids,
			initialPoints,
			updateBidLogic
		]
	);

	const handleBidChange = e => {
		const identifiers = e.target.id.split('-');
		const fightNumber = parseInt(identifiers[0]);
		const field = identifiers[1];
		const currentBid = bids.filter(
			bid => bid.fightNumber === fightNumber
		)[0];
		const updatedBid = { ...currentBid };

		if (field === 'bid') {
			if (e.target.value === '' || e.target.value === '0') {
				updatedBid.bid = null;
			} else {
				updatedBid.bid = parseInt(e.target.value);
			}
		}

		// Map fighter's money line onto bid
		if (field === 'fighter' || e.target.src) {
			let fighterName;

			// Handle if image is clicked on vs input
			if (e.target.src) {
				fighterName = e.target.dataset.name;
			} else {
				fighterName = e.target.value;
			}

			updatedBid.fighter = fighterName;

			if (e.target.value !== '' || e.target.src) {
				const currentFight = cardData.current.fights.filter(
					fight =>
						fight.fighter1.name === fighterName ||
						fight.fighter2.name === fighterName
				)[0];

				if (currentFight.fighter1.name === fighterName) {
					updatedBid.moneyLine = currentFight.fighter1.moneyLine;
				} else {
					updatedBid.moneyLine = currentFight.fighter2.moneyLine;
				}
			}
		}

		const newBidState = [ ...bids ];

		const index = newBidState.findIndex(
			bid => bid.fightNumber === fightNumber
		);
		newBidState[index] = updatedBid;

		setBids(newBidState);

		updateBidLogic(newBidState, initialPoints);
	};

	const toggleEditBidsMode = () => {
		setEditBidsMode(!editBidsMode);
	};

	const resetBids = () => {
		setBids(initialBidState);
		updateBidLogic(initialBidState, initialPoints);
	};

	const saveBids = async action => {
		const validation = validateBids(
			bids,
			bidsRemaining,
			bidsRemainingError,
			pointsAvailableError
		);

		if (validation.type === 'error') {
			setMessage({
				type: 'error',
				description: validation.description
			});
			clearMessage();
			return;
		}

		const payload = {
			bids: bids.filter(bid => bid.bid !== null && bid.fighter !== '')
		};

		try {
			const response = await httpRequest({
				method: action,
				url: `${process.env.REACT_APP_API_URL}/user/${auth.userId}/bid`,
				token: auth.token,
				payload: payload
			});

			if (response.type === 'error') {
				setMessage({
					type: 'error',
					description: response.description
				});
				clearMessage();
				return;
			}

			setMessage({
				type: 'success',
				description: response.data.message
			});

			clearMessage();

			// Add bids to current bids
			if (currentUserBids.bids.length === 0) {
				currentUserBids.bids = [ ...bids ];
			}

			setExistingBids(true);
			setEditBidsMode(false);
			setInitialBidState([ ...bids ]);
		} catch (error) {
			console.log(error);
			if (error.response) {
				console.log(error.response);
				setMessage({
					type: 'error',
					description: error.response.data.error
				});
				clearMessage();
			} else {
				history.push('/500');
			}
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (
		(leagueState.current.activeSeasonSignupOpen === true &&
			!seasonLeaderboardStats.seasonNumber ===
				leagueState.current.activeSeason) ||
		seasonLeaderboardStats.seasonNumber === undefined
	) {
		return <p>Sign up for the next season to play</p>;
	}

	if (
		leagueState.current.activeCardBidsOpen === false &&
		seasonLeaderboardStats.seasonNumber === leagueState.current.activeSeason
	) {
		return <p>Bids are currently closed. Next card will be open soon.</p>;
	}

	if (leagueState.current.activeCardBidsOpen === false) {
		return <p>Bids are currently closed</p>;
	}

	const estimatedWinningsTotal = bids
		.map(bid => {
			return calcPoints(bid.moneyLine, bid.bid, 'w');
		})
		.reduce((acc, cur) => {
			return acc + cur;
		}, 0);

	const bidControls = () => {
		if (currentUserBids.bids.length === 0) {
			return (
				<button className='btn btn-primary' onClick={handleDemoClick}>
					Save Bids
				</button>
			);
		}

		if (currentUserBids && !editBidsMode) {
			return (
				<button
					className='btn btn-primary'
					onClick={toggleEditBidsMode}>
					Edit Bids
				</button>
			);
		}

		return (
			<React.Fragment>
				<button
					className='btn btn-primary--outline'
					onClick={resetBids}>
					Reset
				</button>
				<button className='btn btn-primary' onClick={handleDemoClick}>
					Save Edits
				</button>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<div className='user-dashboard__player-info'>
				<div>
					<h4>{currentUserBids.eventName}</h4>
					<p>{currentUserBids.date}</p>
				</div>
				<div className='user-dashboard__player-stats'>
					<UserStatBlock
						heading='Bids Remaining'
						value={bidsRemaining}
						isError={bidsRemainingError}
					/>
					<UserStatBlock
						heading='Points Available'
						value={pointsAvailable}
						isError={pointsAvailableError}
					/>

					<UserStatBlock heading='Points Spent' value={pointsSpent} />
				</div>
			</div>
			<section className='user-dashboard__bids'>
				{cardData.current.fights.map((fight, index) => (
					<UserBidCard
						key={`fight${index + 1}`}
						fighter1={fight.fighter1}
						fighter2={fight.fighter2}
						fightNumber={index + 1}
						handleBidChange={handleBidChange}
						bidState={bids[index]}
						editBidsMode={editBidsMode}
						existingBids={existingBids}
						selectedFighter={bids[index].fighter}
						estimatedWinnings={calcPoints(
							bids[index].moneyLine,
							bids[index].bid,
							'w'
						)}
					/>
				))}
				<UserBidSummary
					bids={bids}
					pointsAvailable={pointsAvailable}
					pointsSpent={pointsSpent}
					bidsRemaining={bidsRemaining}
					isError={{ pointsAvailableError, bidsRemainingError }}
					estimatedWinnings={estimatedWinningsTotal}
				/>
			</section>
			<MessageContainer type={message.type}>
				{message.description}
			</MessageContainer>

			<div className='user-dashboard__controls'>{bidControls()}</div>
		</React.Fragment>
	);
};

export default ManageBids;
