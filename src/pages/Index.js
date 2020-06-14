import React, { useState, useEffect } from 'react';

import Sidebar from '../components/layout/Sidebar/Sidebar';
import Card from '../components/layout/Card';
import EventMeta from '../components/shared/EventMeta';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PaginationControls from '../components/shared/PaginationControls';

import useScrollToTop from '../hooks/useScrollToTop';
import formatDate from '../utils/formateDate';
import httpRequest from '../utils/httpRequest';

const Index = props => {
	let { seasonID, cardID } = props.match.params;
	const [ cardData, setCardData ] = useState(null);
	const [ sidebarData, setSidebarData ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ showPointsSpent, setShowPointsSpent ] = useState(false);
	const [ showBids, setShowBids ] = useState(true);
	const [ pagination, setPagination ] = useState(null);

	useScrollToTop(cardData);
	useEffect(
		() => {
			const getData = async () => {
				let url;
				if (props.match.path === '/') {
					url = `${process.env.REACT_APP_API_URL}/`;
				} else {
					url = `${process.env
						.REACT_APP_API_URL}/season/${seasonID}/card/${cardID}`;
				}

				try {
					const response = await httpRequest({
						method: 'get',
						url
					});

					if (response.type === 'error') {
						return props.history.push('/maintenance');
					}

					// Change date format from yyyy-mm-dd to mm-dd-yyyy
					response.data.cardData.date = formatDate(
						response.data.cardData.date
					);

					setCardData(response.data.cardData);
					setSidebarData(response.data.sidebar);
					setShowPointsSpent(response.data.showPointsSpent);
					setShowBids(response.data.showBids);
					setPagination(response.data.pagination);

					setIsLoading(false);
				} catch (error) {
					console.log(error);
					props.history.push('/500');
				}
			};
			getData();
		},
		[ cardID, props.match.path, seasonID, props.history ]
	);
	if (isLoading) {
		return <LoadingSpinner />;
	}
	const { cardNumber, seasonNumber, date, eventName } = cardData;
	return (
		<React.Fragment>
			<PaginationControls
				pagination={pagination}
				route='/season/:seasonID/card/:cardID'
			/>
			<EventMeta
				eventName={eventName}
				date={date}
				cardNumber={cardNumber}
				seasonNumber={seasonNumber}
			/>
			<div className='index-content'>
				<main className='main-content'>
					<Card
						data={cardData}
						showPointsSpent={showPointsSpent}
						showBids={showBids}
					/>
				</main>
				<Sidebar data={sidebarData} />
			</div>
			<PaginationControls
				pagination={pagination}
				route='/season/:seasonID/card/:cardID'
			/>
		</React.Fragment>
	);
};

export default Index;
