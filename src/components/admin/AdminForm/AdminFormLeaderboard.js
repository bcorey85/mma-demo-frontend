import React from 'react';

import './AdminFormLeaderboard.scss';

const AdminFormLeaderboard = ({ leaderBoard }) => {
	const leaderBoardList = leaderBoard.map((score, i) => (
		<tr key={i}>
			<td>
				{score.fightName} {score.lastName}
			</td>
			<td>{score.correctPicks}</td>
			<td>{score.points}</td>
		</tr>
	));

	if (leaderBoard.length === 0) {
		return <p>Leader Board is empty</p>;
	}

	return (
		<table className='admin-form__leaderboard'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Correct Picks</th>
					<th>Points</th>
				</tr>
			</thead>
			<tbody>{leaderBoardList}</tbody>
		</table>
	);
};

export default AdminFormLeaderboard;
