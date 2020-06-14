import React from 'react';

import './RuleBlock.scss';

const RuleBlock = ({ title, icon, children }) => {
	return (
		<div className='rule-block'>
			<div className='rule-block__title'>
				<h4>{title}</h4>
				<i className={icon} />
			</div>
			<div className='rule-block__content'>{children}</div>
		</div>
	);
};

export default RuleBlock;
