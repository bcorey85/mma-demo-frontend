import React, { useState, useRef, useEffect } from 'react';

import FightCardBids from './FightCardBids';
import FightCardPagination from './FightCardPagination';

import './FightCardBody.scss';

const FightCardBody = ({ f1Bids, f2Bids, id, showBids }) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const end = useRef(null);
	const limit = useRef(5);
	const [ currentPage, setCurrentPage ] = useState({
		f1Page: [ ...f1Bids.slice(currentIndex, currentIndex + limit.current) ],
		f2Page: [ ...f2Bids.slice(currentIndex, currentIndex + limit.current) ]
	});

	useEffect(
		() => {
			if (f1Bids.length > f2Bids.length) {
				end.current = f1Bids.length - 1;
			} else {
				end.current = f2Bids.length - 1;
			}
		},
		[ f1Bids, f2Bids ]
	);

	useEffect(
		() => {
			setCurrentPage({
				f1Page: [
					...f1Bids.slice(currentIndex, currentIndex + limit.current)
				],
				f2Page: [
					...f2Bids.slice(currentIndex, currentIndex + limit.current)
				]
			});
		},
		[ currentIndex, f1Bids, f2Bids ]
	);

	if (!showBids) {
		return '';
	}

	const handlePrevious = () => {
		let nextIndex = currentIndex - limit.current;
		console.log(nextIndex);

		if (nextIndex <= 0) {
			setCurrentIndex(0);
		}
		setCurrentIndex(nextIndex);
	};

	const handleNext = () => {
		let nextIndex = currentIndex + limit.current;
		if (nextIndex > end.current - limit.current) {
			setCurrentIndex(end.current - limit.current);
		}
		setCurrentIndex(nextIndex);
	};

	const setMinHeight =
		f1Bids.length > 5 || f2Bids.length > 5 ? { minHeight: '32rem' } : null;

	return (
		<React.Fragment>
			<div className='fight-card__body' style={setMinHeight}>
				<FightCardBids bids={currentPage.f1Page} id={`F${id} f1Bids`} />
				<FightCardBids bids={currentPage.f2Page} id={`F${id} f2Bids`} />
			</div>
			<FightCardPagination
				handlePrevious={handlePrevious}
				handleNext={handleNext}
				showPrevious={!(currentIndex === 0)}
				showNext={!(currentIndex > end.current - limit.current)}
			/>
		</React.Fragment>
	);
};

export default FightCardBody;
