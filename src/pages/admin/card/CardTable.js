import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import FightName from '../../../components/shared/FightName';
import PaginationControls from '../../../components/shared/PaginationControls';

import './CardTable.scss';

const CardTable = props => {
	const auth = useContext(AuthContext);
	const [ fights, setFights ] = useState();
	const [ resultsCard, setResultsCard ] = useState();
	const [ isLoading, setIsLoading ] = useState(true);
	const [ pagination, setPagination ] = useState();
	const { seasonID, cardID } = props.match.params;

	useEffect(
		() => {
			const getCard = async () => {
				const response = await axios({
					method: 'get',
					url: `${process.env
						.REACT_APP_API_URL}/admin/season/${seasonID}/card/${cardID}/`,
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				});
				setFights(response.data.card.fights);
				setPagination(response.data.pagination);
				const sortByPlayerName = response.data.card.resultsCard.sort(
					(a, b) => {
						return a.fightName.localeCompare(b.fightName);
					}
				);
				setResultsCard(sortByPlayerName);
				setIsLoading(false);
			};
			getCard();
		},
		[ auth.token, cardID, seasonID ]
	);

	const findBid = (player, fighter) => {
		let bid;
		if ((bid = player.bids.find(bid => bid.fighter === fighter.name))) {
			return bid.bid;
		} else {
			return (bid = '');
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='card-table'>
			<PaginationControls
				pagination={pagination}
				route='/admin/season/:seasonID/card/:cardID/table'
			/>

			<NavLink
				to={`/admin/season/${seasonID}/card/${cardID}/edit`}
				className='btn btn-primary--outline'>
				Back to Card
			</NavLink>
			<div className='table-scroll-wrapper'>
				<table>
					<thead>
						<tr>
							<th>
								<div>Season {seasonID}</div>
								<div>Card {cardID}</div>
							</th>
							<th className='card-table__divider' />
							{fights.map((fight, index) => {
								return (
									<React.Fragment key={`fight ${index + 1}`}>
										<th className='card-table__header'>
											{fight.fighter1.name}
										</th>
										<th className='card-table__header'>
											{fight.fighter2.name}
										</th>
										<th className='card-table__divider' />
									</React.Fragment>
								);
							})}
							<th className='card-table__header'>Points Spent</th>
							<th className='card-table__header'>
								Correct Picks
							</th>
							<th className='card-table__header'>
								Bonus - Penalty
							</th>
							<th className='card-table__header'>
								Points Earned
							</th>
						</tr>

						<tr>
							<td />
							<td className='card-table__divider' />
							{fights.map((fight, index) => {
								return (
									<React.Fragment
										key={`fight ${index + 1} odds`}>
										<td>{fight.fighter1.moneyLine}</td>
										<td>{fight.fighter2.moneyLine}</td>
										<td className='card-table__divider' />
									</React.Fragment>
								);
							})}
							<td />
							<td />
							<td />
							<td />
						</tr>
					</thead>
					<tbody>
						{resultsCard.map(player => {
							return (
								<tr key={player.fightName}>
									<td>
										<FightName
											fightName={player.fightName}
											lastName={player.lastName}
										/>
									</td>
									<td className='card-table__divider' />
									{fights.map((fight, index) => {
										return (
											<React.Fragment
												key={`player.fightName fight ${index +
													1}`}>
												<td>
													{findBid(
														player,
														fight.fighter1
													)}
												</td>
												<td>
													{findBid(
														player,
														fight.fighter2
													)}
												</td>
												<td className='card-table__divider' />
											</React.Fragment>
										);
									})}
									<td>{player.pointsSpent}</td>
									<td>{player.correctPicks}</td>
									<td>{player.adjustments}</td>
									<td>{player.adjustedPoints}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CardTable;
