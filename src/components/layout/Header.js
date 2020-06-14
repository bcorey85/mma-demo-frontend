import React from 'react';
import { NavLink } from 'react-router-dom';

import MainNav from './MainNav';

import './Header.scss';

const Header = () => {
	return (
		<div className='header'>
			<div className='header__inner'>
				<div className='header__logo--large'>
					<NavLink to='/'>MMA Fantasy Sports League</NavLink>
				</div>
				<MainNav />
			</div>
		</div>
	);
};

export default Header;
