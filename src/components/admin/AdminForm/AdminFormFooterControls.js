import React from 'react';

import './AdminFormFooterControls.scss';

const AdminFormFooterControls = ({
	b1Text,
	b2Text,
	b1HandleClick,
	b2HandleClick
}) => {
	return (
		<div className='admin-form-footer-controls'>
			<button className='btn btn-primary' onClick={b1HandleClick}>
				{b1Text}
			</button>
			{b2Text && (
				<button
					className='btn btn-delete--outline'
					onClick={b2HandleClick}>
					{b2Text}
				</button>
			)}
		</div>
	);
};

export default AdminFormFooterControls;
