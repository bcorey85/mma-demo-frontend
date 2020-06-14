import React from 'react';

import FightName from '../../shared/FightName';

import './SidebarLeaderboard.scss';

const SidebarLeaderboard = ({ leaderBoard }) => {
	return (
		<div className='leaderboard'>
			<div className='leaderboard__row'>
				<div className='leaderboard__row--item1'>Correct Picks</div>
				<div className='leaderboard__row--item2'>Points</div>
			</div>
			<div>
				{leaderBoard.map(player => {
					return (
						<React.Fragment key={player.fightName}>
							<FightName
								fightName={player.fightName}
								lastName={player.lastName}
							/>
							<div className='leaderboard__row'>
								<div className='leaderboard__row--item1'>
									{player.correctPicks}
								</div>
								<div className='leaderboard__row--item2'>
									{player.points}
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default SidebarLeaderboard;
