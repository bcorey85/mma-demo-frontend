import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import LoadingSpinner from '../components/shared/LoadingSpinner';

const PastCards = () => {
	const [ seasonData, setSeasonData ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const data = await axios.get(
			`${process.env.REACT_APP_API_URL}/pastcards`
		);

		setSeasonData(data.data.seasonObject);
		setIsLoading(false);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const seasons = seasonData.map(season => (
		<ul className='link-list' key={season.season}>
			<h3>Season {season.season}</h3>
			{season.cards.map(card => (
				<li key={`${season.season} ${card}`}>
					<NavLink
						to={`/season/${season.season}/card/${card}`}
						className='link-list__link'>
						Card {card}
					</NavLink>
				</li>
			))}
		</ul>
	));
	return (
		<main className='main-content--fw'>
			<h2 className='page-title'>Past Cards</h2>
			{seasons}
		</main>
	);
};

export default PastCards;
