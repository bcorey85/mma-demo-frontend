import { Card, Fight } from './cardModels';
import { limitRange } from '../../utils/limitNum';
import produce from 'immer';

export const createCard = (state, action) => {
	const { numFights } = action.payload;
	const newCard = Card();

	for (let i = 0; i < numFights; i++) {
		newCard.fights.push(
			Fight({
				fightNumber: i + 1,
				fighter1: {
					name: '',
					image: '',
					moneyLine: null,
					outcome: ''
				},
				fighter2: {
					name: '',
					image: '',
					moneyLine: null,
					outcome: ''
				},
				fighter1Bids: [],
				fighter2Bids: []
			})
		);
	}

	return produce(state, draftState => {
		return (draftState = newCard);
	});
};

export const editCard = (state, action) => {
	const card = action.payload;
	return produce(state, draftState => {
		return (draftState = card);
	});
};

export const updateMetaField = (state, action) => {
	const { field, value } = action.payload;

	// Prevent Credit Card autofill error bug
	if (field === 'num') {
		return produce(state, draftState => {
			draftState.cardNumber = value;
		});
	}

	// Limit Max Bids range
	if (field === 'maxBids') {
		return produce(state, draftState => {
			// Max bids can not exceed max number of fights
			const maxBids = limitRange(
				value,
				1,
				draftState.fights.length || 20
			);
			draftState.maxBids = maxBids;
		});
	}

	// Limit Max Bids range
	if (field === 'numFights') {
		return produce(state, draftState => {
			const numFights = limitRange(value, 1, 20);

			if (numFights > draftState.fights.length) {
				const newFights = numFights - draftState.fights.length;

				for (let i = 0; i < newFights; i++) {
					draftState.fights.push(
						Fight({
							fightNumber: draftState.fights.length + 1,
							fighter1: {
								name: '',
								image: '',
								moneyLine: null,
								outcome: ''
							},
							fighter2: {
								name: '',
								image: '',
								moneyLine: null,
								outcome: ''
							},
							fighter1Bids: [],
							fighter2Bids: []
						})
					);
				}
			} else {
				draftState.fights = draftState.fights.slice(0, numFights);
			}

			if (parseInt(draftState.maxBids) > parseInt(numFights)) {
				draftState.maxBids = numFights;
			}
		});
	}

	return produce(state, draftState => {
		draftState[field] = value;
	});
};

export const updateFightField = (state, action) => {
	const { field, value } = action.payload;
	const identifiers = field.split('-');
	const index = identifiers[1];
	const fighterNum = identifiers[2];
	const fighterInfo = identifiers[3];

	return produce(state, draftState => {
		draftState.fights[index][fighterNum][fighterInfo] = value;
	});
};

export const updateResultsCard = (state, action) => {
	const { field, value } = action.payload;

	const identifiers = field.split('-');
	const index = identifiers[1];
	const points = state.resultsCard[index].points;
	let adjustedPoints;
	let adjustments;
	if (value === '' && points !== null) {
		adjustments = '';
		adjustedPoints = points;
	} else if (value === '' && points === null) {
		adjustments = '';
		adjustedPoints = null;
	} else {
		adjustments = parseInt(value);
		adjustedPoints = points + adjustments;
	}
	const playerResults = state.resultsCard[index];
	const updatedResult = {
		...playerResults,
		adjustments,
		adjustedPoints
	};
	const newState = [ ...state.resultsCard ];
	newState[index] = updatedResult;

	return produce(state, draftState => {
		draftState.resultsCard = newState;
	});
};
