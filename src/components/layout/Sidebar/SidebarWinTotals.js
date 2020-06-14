import React from 'react';

import './SidebarWinTotals.scss';

const SidebarWinTotals = ({ winTotals }) => {
	return (
		<div className='win-totals'>
			<div className='win-totals__row'>
				<div className='win-totals__row--item2'>Favorite</div>
				<div className='win-totals__row--item3'>Underdog</div>
			</div>
			{winTotals.cardTotals.map((card, i) => {
				return (
					<div className='win-totals__row' key={i}>
						<div className='win-totals__row--item1'>
							Card {i + 1}
						</div>
						<div className='win-totals__row--item2'>
							{card.favorite}
						</div>
						<div className='win-totals__row--item3'>
							{card.underdog}
						</div>
					</div>
				);
			})}
			<div className='win-totals__row'>
				<div className='win-totals__row--item1'>
					<strong>Total</strong>
				</div>
				<div className='win-totals__row--item2'>
					<strong>{winTotals.total.favorite}</strong>
				</div>
				<div className='win-totals__row--item3'>
					<strong>{winTotals.total.underdog}</strong>
				</div>
			</div>
		</div>
	);
};

export default SidebarWinTotals;
