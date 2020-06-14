import React from 'react';
import { NavLink } from 'react-router-dom';

import './PaginationControls.scss';

const PaginationControls = ({ pagination, border, route }) => {
	let prevRoute;
	if (pagination.prev) {
		prevRoute = route
			.replace(':seasonID', pagination.prev.seasonID)
			.replace(':cardID', pagination.prev.cardID);
	}

	let nextRoute;
	if (pagination.next) {
		nextRoute = route
			.replace(':seasonID', pagination.next.seasonID)
			.replace(':cardID', pagination.next.cardID);
	}

	return (
		<div className={`pagination-controls pagination-controls--${border}`}>
			<div className='pagination-controls__prev'>
				{pagination.prev && (
					<NavLink
						className='pagination-controls__link'
						to={prevRoute}>
						Previous Card
					</NavLink>
				)}
			</div>
			<div className='pagination-controls__next'>
				{pagination.next && (
					<NavLink
						className='pagination-controls__link'
						to={nextRoute}>
						Next Card
					</NavLink>
				)}
			</div>
		</div>
	);
};

export default PaginationControls;
