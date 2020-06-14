import {
	createCard,
	editCard,
	updateMetaField,
	updateFightField,
	updateResultsCard
} from './cardActions';

const cardReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_CARD':
			return createCard(state, action);
		case 'EDIT_CARD':
			return editCard(state, action);
		case 'UPDATE_META_FIELD':
			return updateMetaField(state, action);
		case 'UPDATE_FIGHT_FIELD':
			return updateFightField(state, action);
		case 'UPDATE_RESULTS_CARD':
			return updateResultsCard(state, action);
		default:
			return state;
	}
};

export default cardReducer;
