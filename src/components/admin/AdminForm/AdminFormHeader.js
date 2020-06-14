import React from 'react';
import { NavLink } from 'react-router-dom';

import './AdminFormHeader.scss';

const AdminFormHeader = ({ title, subtitle }) => {
	return (
		<React.Fragment>
			<h2>admin</h2>
			<ul className='admin-form-header'>
				<li>
					<NavLink to='/admin/dashboard'>Main Menu</NavLink>
				</li>
			</ul>
			<div className='admin-form-header__titles'>
				<h3>{title}</h3>
				{subtitle && <h4>{subtitle}</h4>}
			</div>
		</React.Fragment>
	);
};

export default AdminFormHeader;
