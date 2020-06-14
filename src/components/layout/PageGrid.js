import React from 'react';

import Header from './Header';
import Footer from './Footer';
import './PageGrid.scss';

const PageGrid = props => {
	return (
		<React.Fragment>
			<div className='container'>
				<Header />
				<div className='content'>{props.children}</div>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default PageGrid;
