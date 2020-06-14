import React from 'react';

import FightCard from '../FightCard/FightCard';
import ResultsCard from '../ResultsCard/ResultsCard';

const Card = ({ data, showPointsSpent, showBids }) => {
	const fights = data.fights;
	const resultsCard = data.resultsCard;
	return (
		<React.Fragment>
			{fights.map((fight, i) => {
				return (
					<FightCard
						fightNumber={i + 1}
						fighter1={fight.fighter1}
						fighter2={fight.fighter2}
						f1Bids={fight.fighter1Bids}
						f2Bids={fight.fighter2Bids}
						key={i + 1}
						showBids={showBids}
					/>
				);
			})}
			<ResultsCard
				data={resultsCard}
				seasonNumber={data.seasonNumber}
				cardNumber={data.cardNumber}
				showPointsSpent={showPointsSpent}
				showBids={showBids}
			/>
		</React.Fragment>
	);
};

export default Card;
