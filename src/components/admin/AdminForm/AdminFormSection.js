import React from 'react';

import './AdminFormSection.scss';

const AdminFormSection = ({ title, children }) => {
	return (
		<div className='admin-form-section'>
			<h2>{title}</h2>
			<div className='admin-form-section__content'>{children}</div>
		</div>
	);
};

export default AdminFormSection;
