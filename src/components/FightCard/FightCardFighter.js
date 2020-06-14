import React from 'react';

import './FightCardFighter.scss';

const FightCardFighter = ({
	image,
	name,
	moneyLine,
	outcome,
	border,
	handleClick,
	fightNumber,
	selectedFighter,
	bidsCard,
	editBidsMode
}) => {
	if (bidsCard) {
		return (
			<div className='fight-card__fighter'>
				<div
					className={`fight-card__fighter-img`}
					onClick={editBidsMode ? handleClick : null}>
					<img
						src={image}
						alt={name}
						id={`${fightNumber}-${name}`}
						data-name={name}
						className={`${selectedFighter === name
							? 'fight-card__fighter-img--selected'
							: 'fight-card__fighter-img--unselected'}`}
					/>
					<span>
						<div>{outcome}</div>
					</span>
				</div>
				<div className='fight-card__fighter-name'>{name}</div>
				<div className='fight-card__fighter-odds'>{moneyLine}</div>
			</div>
		);
	}

	return (
		<div className='fight-card__fighter'>
			<div
				className={`fight-card__fighter-img ${border}`}
				onClick={handleClick}>
				<img src={image} alt={name} />
				<span>
					<div>{outcome}</div>
				</span>
			</div>
			<div className='fight-card__fighter-name'>{name}</div>
			<div className='fight-card__fighter-odds'>{moneyLine}</div>
		</div>
	);
};

export default FightCardFighter;
