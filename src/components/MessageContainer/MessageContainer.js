import React from 'react';

import './MessageContainer.scss';
const MessageContainer = props => {
	return (
		<div className={`message-container message-container--${props.type}`}>
			{props.children}
		</div>
	);
};

export default MessageContainer;
