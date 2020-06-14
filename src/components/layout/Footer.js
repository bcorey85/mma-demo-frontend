import React from 'react';

import './Footer.scss';

const Footer = () => {
	return (
		<div className='footer'>
			<div>© Copyright {new Date().getFullYear()} </div>
		</div>
	);
};

export default Footer;
