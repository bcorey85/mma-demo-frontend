import React from 'react';

import './UserStatBlock.scss';

const UserStatBlock = ({ heading, value, isError }) => {
	const style = isError
		? { color: 'red', fontStyle: 'italic', fontWeight: 500 }
		: null;

	return (
		<div className='user-stat-block'>
			<div>{heading}</div>
			<div style={style}>{value}</div>
		</div>
	);
};

export default UserStatBlock;
