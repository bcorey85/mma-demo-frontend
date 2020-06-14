import React, { useState, useEffect, useRef } from 'react';

import LoadingSpinner from '../shared/LoadingSpinner';
import MessageContainer from '../MessageContainer/MessageContainer';

import useMessage from '../../hooks/useMessage';

import './PastBids.scss';

const PastBids = ({ bids }) => {
	const [ cardNumbers, setCardNumbers ] = useState([]);
	const [ seasonNumbers, setSeasonNumbers ] = useState([]);
	const [ card, setCard ] = useState(null);
	const [ season, setSeason ] = useState(null);
	const [ selectedBids, setSelectedBids ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ message, setMessage, clearMessage ] = useMessage();
	const seasonsRef = useRef();
	const bidsObjectRef = useRef();

	seasonsRef.current = [ ...new Set(bids.map(bid => bid.seasonNumber)) ];
	// Organize bids by season and card
	bidsObjectRef.current = {};
	if (bids.length > 0) {
		seasonsRef.current.forEach(season => {
			bidsObjectRef.current[season] = {};
			const bidsInSeason = bids.filter(
				bid => bid.seasonNumber === season
			);
			const cardNumbers = [
				...new Set(bidsInSeason.map(bid => bid.cardNumber))
			];

			cardNumbers.forEach(card => {
				bidsObjectRef.current[season][card] = bidsInSeason.filter(
					bid => bid.cardNumber === card
				);
			});
		});
	}

	useEffect(
		() => {
			if (bids.length === 0) {
				setIsLoading(false);
				return;
			}

			setSeasonNumbers(seasonsRef.current);
			setCardNumbers(
				Object.keys(bidsObjectRef.current[seasonsRef.current[0]])
			);
			setIsLoading(false);
		},
		[ bids, bidsObjectRef, seasonsRef ]
	);

	const handleSeasonSelect = async e => {
		setSeason(e.target.value);
		if (e.target.value > 0) {
			setCardNumbers(Object.keys(bidsObjectRef.current[e.target.value]));
		} else {
			setCardNumbers([]);
		}
	};

	const handleCardSelect = e => {
		setCard(e.target.value);
	};

	const handleSelectBids = () => {
		if (!season) {
			setMessage({
				type: 'error',
				description: 'Please choose a valid season'
			});
			clearMessage();
			return;
		}

		if (!card) {
			setMessage({
				type: 'error',
				description: 'Please choose a valid card'
			});
			clearMessage();
			return;
		}

		setSelectedBids(bidsObjectRef.current[season][card]);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const pastBidsTable = (
		<table>
			<thead>
				<tr>
					<th>Fight Number</th>
					<th>Fighter</th>
					<th>Money Line</th>
					<th>Outcome</th>
					<th>Amount Bid</th>
					<th>Amount Won</th>
				</tr>
			</thead>
			<tbody>
				{selectedBids.map(bid => {
					return (
						<tr key={bid.fightNumber}>
							<td>{bid.fightNumber}</td>
							<td>{bid.fighter}</td>
							<td>{bid.moneyLine}</td>
							<td>{bid.outcome}</td>
							<td>{bid.bid}</td>
							<td>{bid.points}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);

	return (
		<section className='user-dashboard__section'>
			<h3>Past Bids</h3>
			<div className='past-bids'>
				<div className='past-bids__controls'>
					<div>
						<label htmlFor='season'>Season</label>
						<select
							id='season'
							value={season || ''}
							onChange={handleSeasonSelect}>
							<option value={''} />
							{seasonNumbers.map(season => {
								return (
									<option value={season} key={season}>
										{season}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<label htmlFor='card'>Card</label>
						<select
							id='card'
							value={card || ''}
							onChange={handleCardSelect}>
							<option value={''} />
							{cardNumbers.map(card => {
								return (
									<option value={card} key={card}>
										{card}
									</option>
								);
							})}
						</select>
					</div>

					<button
						className='btn btn-primary--outline'
						onClick={handleSelectBids}>
						Select
					</button>
				</div>

				<MessageContainer type={message.type}>
					{message.description}
				</MessageContainer>
				{selectedBids.length > 0 ? pastBidsTable : ''}
			</div>
		</section>
	);
};

export default PastBids;
