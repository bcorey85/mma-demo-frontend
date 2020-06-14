import React from 'react';

import './SidebarSection.scss';

const SidebarSection = ({ title, children }) => {
	return (
		<div className='sidebar-section'>
			<h3 className='sidebar-section__heading'>{title}</h3>
			{children}
		</div>
	);
};

export default SidebarSection;
