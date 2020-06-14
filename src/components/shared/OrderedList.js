import React from 'react';

import './OrderedList.scss';

const OrderedList = ({ start, listType, children }) => {
	return (
		<ol
			start={start}
			style={{ fontWeight: 600 }}
			className={`ordered-list ordered-list--${listType}`}>
			{children}
		</ol>
	);
};

export default OrderedList;
