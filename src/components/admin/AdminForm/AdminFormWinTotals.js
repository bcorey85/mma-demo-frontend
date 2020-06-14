import React from 'react';

import './AdminFormWinTotals.scss';

const AdminFormWinTotals = ({ winTotals, handleChange }) => {
	return (
		<table className='admin-form__win-totals'>
			<thead>
				<tr>
					<th>Card</th>
					<th>Favorite</th>
					<th>Underdog</th>
				</tr>
			</thead>
			<tbody>
				{winTotals.cardTotals.map((card, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{card.favorite}</td>
						<td>{card.underdog}</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td>Total</td>
					<td>{winTotals.total.favorite}</td>
					<td>{winTotals.total.underdog}</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default AdminFormWinTotals;
