import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import './MainNav.scss';

const MainNav = () => {
	const [ menuOpen, setMenuOpen ] = useState(false);
	const toggleNav = value => {
		setMenuOpen(!menuOpen);
	};
	const auth = useContext(AuthContext);

	// const authLinks = () => {
	// 	if (auth.isLoggedIn && auth.isAdmin === false) {
	// 		return (
	// 			<li>
	// 				<NavLink
	// 					to={`/user/${auth.userId}`}
	// 					className='nav__link'
	// 					onClick={menuOpen ? toggleNav : null}>
	// 					Dashboard
	// 				</NavLink>
	// 			</li>
	// 		);
	// 	} else if (auth.isLoggedIn && auth.isAdmin === true) {
	// 		return (
	// 			<li>
	// 				<NavLink
	// 					to='/admin/dashboard'
	// 					className='nav__link'
	// 					onClick={menuOpen ? toggleNav : null}>
	// 					Admin Dashboard
	// 				</NavLink>
	// 			</li>
	// 		);
	// 	} else {
	// 		return (
	// 			<li>
	// 				<NavLink
	// 					to='/login'
	// 					className='nav__link'
	// 					onClick={menuOpen ? toggleNav : null}>
	// 					Login
	// 				</NavLink>
	// 			</li>
	// 		);
	// 	}
	// };

	const authLinks = () => {
		if (auth.isLoggedIn && auth.isAdmin === false) {
			return (
				<li>
					<NavLink
						to={`/user/${auth.userId}`}
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Dashboard
					</NavLink>
				</li>
			);
		} else {
			return (
				<li>
					<NavLink
						to='/login'
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Dashboard
					</NavLink>
				</li>
			);
		}
	};

	const adminAuthLinks = () => {
		if (auth.adminIsLoggedIn && auth.isAdmin === true) {
			return (
				<li>
					<NavLink
						to={`/admin/dashboard`}
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Admin
					</NavLink>
				</li>
			);
		} else {
			return (
				<li>
					<NavLink
						to='/admin'
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Admin
					</NavLink>
				</li>
			);
		}
	};

	return (
		<nav className='nav'>
			<ul className={`nav__main ${menuOpen ? 'nav__main--open' : ''}`}>
				<li>
					<NavLink
						to='/'
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/pastcards'
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Past Cards
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/rules'
						className='nav__link'
						onClick={menuOpen ? toggleNav : null}>
						Rules
					</NavLink>
				</li>
				{authLinks()}
				{adminAuthLinks()}
			</ul>
			<div className='nav__mobile'>
				<div
					className={`nav-toggle ${menuOpen ? 'nav-toggle--x' : ''}`}
					onClick={toggleNav}>
					<span className='nav-toggle--middle' />
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
