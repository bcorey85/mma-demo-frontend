import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminFormCardList = ({ cards, seasonNumber }) => {
	const cardList = cards.map(card => (
		<div className='admin-form__item' key={card.cardNumber}>
			<strong>Card {card.cardNumber}</strong>:{' '}
			{card.fights[0].fighter1.name} vs {card.fights[0].fighter2.name} -{' '}
			<NavLink
				to={`/admin/season/${card.seasonNumber}/card/${card.cardNumber}/edit`}
				className='admin-form__link'>
				Edit
			</NavLink>
		</div>
	));

	return (
		<React.Fragment>
			{cards.length === 0 && (
				<div className='admin-form__item'>No Cards Exist</div>
			)}
			{cardList}
			<div className='admin-form-footer-controls'>
				<NavLink
					to={`/admin/season/${seasonNumber}/card/new`}
					className='btn btn-primary--outline'>
					Add New Card
				</NavLink>
			</div>
		</React.Fragment>
	);
};

export default AdminFormCardList;
