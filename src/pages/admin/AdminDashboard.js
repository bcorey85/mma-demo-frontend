import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import ManageLeague from '../../components/admin/AdminDashboard/ManageLeague';

const AdminDashBoard = props => {
	const { logout } = useContext(AuthContext); // need to logout on backend

	return (
		<main className='main-content'>
			<div className='u-full-width'>
				<h2>admin</h2>
				<ManageLeague history={props.history} />
				<h3>Manage Seasons</h3>
				<ul className='link-list'>
					<li>
						<NavLink
							to={`/admin/season/new`}
							className='link-list__link'>
							Create Season
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`/admin/season/`}
							className='link-list__link'>
							Edit Season
						</NavLink>
					</li>
				</ul>
				<h3>Manage Users</h3>
				<ul className='link-list'>
					<li>
						<NavLink
							to={`/admin/user/edit`}
							className='link-list__link'>
							Edit User
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`/admin/user/email`}
							className='link-list__link'>
							Send Email
						</NavLink>
					</li>
				</ul>
				<div className='form__footer-controls'>
					<button className='btn btn-primary' onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</main>
	);
};

export default AdminDashBoard;
